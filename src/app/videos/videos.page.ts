import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  videos: any[] = [];
  loading: boolean = true;

  constructor(
    private hhtp: HttpClient, 
    private toastController: ToastController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadVideos();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  loadVideos() {

    const token = localStorage.getItem('token');

    this.hhtp.get('https://uasdapi.ia3x.com/videos', {
      headers: { Authorization: `Bearer ${token}` },
    }).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (Array.isArray(response)) {
          this.videos = response;
        } else {
          this.showToast('Error al cargar los videos.');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar videos:', error);
        this.showToast('Error al cargar videos.');
      }
    );
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    const embedUrl = `https://www.youtube.com/embed/${url}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}
