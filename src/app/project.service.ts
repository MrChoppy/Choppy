import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firestore: AngularFirestore) {}

  getProjects(): Observable<any[]> {
    return this.firestore
      .collection('projects')
      .snapshotChanges()
      .pipe(
        switchMap((projects) => {
          const projectObservables = projects.map((project) => {
            const projectId = project.payload.doc.id;
            const projectData = project.payload.doc.data();
            return this.firestore
              .collection(`projects/${projectId}/links`)
              .valueChanges()
              .pipe(
                // Map the links data to the project
                map((links) => ({
                  ...(projectData as Record<string, unknown>),
                  links: links,
                }))
              );
          });
          // Combine the project observables into a single observable
          return combineLatest(projectObservables);
        })
      );
  }
}
