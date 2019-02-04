import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photo: Photo;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    this.photoId = Number(this.route.snapshot.paramMap.get('id'));
    this.photoService.findById(this.photoId).subscribe(photo => {
      this.photo = photo;
    }, () => {
      this.router.navigate(['not-found']);
    });

    // this.photo$.subscribe(() => {}, err => {
    //   this.router.navigate(['not-found']);
    // });
  }

  remove() {
    this.photoService.removePhoto(this.photoId)
                      .subscribe(() => {
                          this.alertService.success('Photo removed', true);
                          this.router.navigate(['/user', this.userService.getUserName()],
                            { replaceUrl: true });
                        },
                        err => {
                          console.log(err);
                          this.alertService.warning('Could not delete photo');
                        });
  }

  like(photo: Photo) {
    this.photoService.like(photo.id)
                      .subscribe(liked => {
                        if (liked) {
                          this.photoService.findById(photo.id).subscribe(photoR => {
                            this.photo = photoR;
                          });
                        }
                      });
  }
}
