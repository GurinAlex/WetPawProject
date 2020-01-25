import { Component, OnInit } from '@angular/core';
import {Post} from '../../shared/interfaces';
import {finalize} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {PostService} from '../../shared/post.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';
import {AlertService} from '../shared/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  reader: FileReader;
  form: FormGroup;
  // imageURL = 'http://s1.iconbird.com/ico/2013/9/435/w512h5121379964647Downloads.png';
  imageURL = '';
  uploadPercent: Observable<number>;
  imagePreview = '';
  checkImage = false;
  // formValid = false;
  constructor(
    private postService: PostService,
    private router: Router,
    private storage: AngularFireStorage,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.form = new FormGroup ({
      address: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sex: new FormControl('Мальчик'),
      contacts: new FormControl(null, Validators.required),
      category: new FormControl('Потерявшиеся', Validators.required)
    });
  }
  sexValue(sex: string): boolean {
    if (sex === 'Мальчик') {
      return true;
    } else {
      return false;
    }
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    // const filePath = event.target.files[0].name;
    const filePath = uuid();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe((res) => {
        this.imageURL = res;
        this.checkImage = true;
      })))
      .subscribe();
    // Просмотр превью картинки
    this.reader = new FileReader();
    this.reader.onload = (event:any) => {
      this.imagePreview = event.target.result;
    };
    this.reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid || this.checkImage === false) {
      return;
    }

    const post: Post = {
      address: this.form.value.address,
      sex: this.sexValue(this.form.value.sex),
      description: this.form.value.description,
      contacts: this.form.value.contacts,
      image: this.imageURL,
      category: this.form.value.category
    };
    this.postService.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Пост отправлен на рассмотрение');
      this.reader.EMPTY;
      this.imageURL = '';
      this.imagePreview = '';
    });
  }
}
