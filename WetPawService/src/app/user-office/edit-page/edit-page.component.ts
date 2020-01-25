import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {finalize, switchMap} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  imageURL = '';
  form: FormGroup;
  post: Post;
  submitted = false;
  dSub: Subscription;
  updateSub: Subscription;
  sex: string;
  checkImage = false;
  imagePreview = '';

  constructor(
    private rout: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private storage: AngularFireStorage,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.rout.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      })
    ).subscribe((post: Post) => {
      this.post = post;
      if (post.sex === true) {
        this.sex = 'Мальчик';
      } else {
       this.sex = 'Девочка';
      }
      this.imageURL = post.image;
      this.form = new FormGroup({
        address: new FormControl(post.address, Validators.required),
        description: new FormControl(post.description, Validators.required),
        sex: new FormControl(this.sex),
        contacts: new FormControl(post.contacts, Validators.required),
        category: new FormControl(post.category, Validators.required)
      });
    });
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = event.target.files[0].name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe((res) => {
        this.imageURL = res;
        this.checkImage = true;
      })))
      .subscribe();
    // Просмотр превью картинки
    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagePreview = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
  sexValue(sex: string): boolean {
    if (sex === 'Мальчик') {
      return true;
    } else {
      return false;
    }
  }
  remove(id: number) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.alert.warning('Пост удален');
      this.router.navigate(['/user', 'posts']);
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.updateSub = this.postService.update({
      ...this.post,
      address: this.form.value.address,
      sex: this.sexValue(this.form.value.sex),
      description: this.form.value.description,
      contacts: this.form.value.contacts,
      image: this.imageURL,
      category: this.form.value.category
    }).subscribe( () => {
      this.submitted = false;
      this.alert.success('Пост обновлен и отправлен на рассмотрение');
      this.router.navigate(['/user', 'posts']);
    });
  }
}
