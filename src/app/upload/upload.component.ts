import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ListpostService} from '../listpost.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  @Output() postUpload = new EventEmitter<any>();
  captionStatus: string;
  url = null;
  urlImage = '';
  baseUrl = 'http://res.cloudinary.com/hoang1005/image/upload/';
  isShowForm = false;
  isShowForm2 = false;
  isShowForm3 = true;
  isShowPost = false;
  isShowCaption = false;
  showformfilter = true;
  showformcrop = false;
  showformtag = false;
  statusState = 1;
  public_id;


  typePost = 'Friends';
  items = [];
  colors = [{id: 'e_red', name: 'Red'}, {id: 'e_saturation', name: 'Saturation'}, {id: 'e_blackwhite', name: 'Black -White'},
    {id: 'e_grayscale', name: 'Grayscale'}, {id: 'e_art:sizzle', name: 'Sizzle'}, {id: 'e_brightness_hsb', name: 'Brightness'},
    {id: 'e_green', name: 'Green'}, {id: 'e_art:red_rock', name: 'Red_rock'},
    {id: 'e_negate', name: 'Negate'}, {id: 'e_sepia', name: 'Sepia'}];

  cloudinaryImage: any;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'hoang1005', uploadPreset: 'hoangtest'})
  );


  constructor(private http: HttpClient, private postServices: ListpostService) {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      this.cloudinaryImage = JSON.parse(response);
      this.public_id = this.cloudinaryImage.public_id;
      console.log(this.cloudinaryImage);
      this.url = this.baseUrl + this.public_id;
      this.isShowPost = true;
      this.getTagStatus();
      return {item, response, status, headers};
    };
  }

  filters(id) {
    this.url = this.baseUrl + this.colors[id].id + '/' + 'c_mpad' + '/' + this.public_id;
  }

  upload() {
    if (this.isShowForm2) {
      console.log('Url up ảnh');
      this.uploadFromUrl();
    } else if (this.isShowForm) {
      console.log('ngu rồi');
      this.uploader.uploadAll();
    } else {
      console.log('Chọn ảnh đi bạn ơi');
    }
  }

  pushStatus() {
    console.log('hihi' + this.captionStatus);
    if (this.url !== null) {
      this.postServices.pushStatus([this.url], this.captionStatus, this.items, this.statusState)
        .then(resJson => this.postUpload.emit(resJson.data.list));
    } else if (null === this.url) {
      console.log('Chọn ảnh đi bạn ơi');
    }
    this.reset();
  }

  uploadFromUrl() {
    const body = 'file=' + encodeURIComponent(this.urlImage) + '&upload_preset=hoangtest';
    return this.http.post('https://api.cloudinary.com/v1_1/hoang1005/auto/upload', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }).subscribe(data => {
      this.public_id = data['public_id'];
      this.url = this.baseUrl + data['public_id'];
      this.getTagStatus();
      this.isShowPost = true;
    });
  }

  ngOnInit() {
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (eventE: any) => {
        this.isShowForm3 = false;
        this.url = eventE.target.result;
        this.isShowCaption = true;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.upload();
    }
  }

  reset() {
    this.isShowForm3 = true;
    this.isShowForm2 = false;
    this.url = null;
    this.isShowCaption = false;
    this.isShowPost = false;
    this.captionStatus = '';
  }

  resetfilter() {
    this.url = this.baseUrl + this.public_id;
  }

  onSearchChange(searchValue: string) {
    this.isShowForm3 = false;
    this.isShowForm = true;
    this.urlImage = searchValue;
    this.isShowCaption = true;
    this.upload();
  }

  setSaving(element, text) {
    this.typePost = text;
    if (this.typePost === 'Friends') {
      this.statusState = 1;
    } else if (this.typePost === 'Public') {
      this.statusState = 2;
    } else {
      this.statusState = 0;
    }
    element.disabled = false;
  }

  getTagStatus() {
    const urlGetTag = 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/describe';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '1045451123374f3dbabb1cd0a5356728'
    });
    const body = {url: this.url};
    return this.http.post(urlGetTag, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Ocp-Apim-Subscription-Key', '1045451123374f3dbabb1cd0a5356728'),
    }).subscribe(data => {
      console.log(data);
      if (data['description']['tags'] > 3) {
        this.items = data['description']['tags'].slice(0, 3);
      } else {
        this.items = data['description']['tags'];
      }

    });
  }
}


