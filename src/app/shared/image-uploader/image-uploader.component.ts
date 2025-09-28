import {Component, inject, input, InputSignal, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FileService} from '@core/services/file.service';
import {Button} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, ProgressSpinner],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss'
})
export class ImageUploaderComponent {
  private fileService = inject(FileService);
  private messageService = inject(MessageService);
  imageGroup: InputSignal<FormGroup> = input.required();
  isLoading: WritableSignal<boolean> = signal(false);

  onFileSelected(event: Event): void {
    this.isLoading.set(true);
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.fileService.upload(file).subscribe({
      next: response => {
        if (response?.url?.length) {
          this.imageGroup().patchValue(response);
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image successful uploaded!',
            life: 3000
          });
        }
      },
      error: error => {
        console.error(error);
        this.isLoading.set(false);
      }
    });
  }

  removeImage(fileInput: HTMLInputElement): void {
    this.isLoading.set(true);
    const publicId: string = this.imageGroup()?.get('publicId')?.value ?? '';
    if (publicId) {
      this.fileService.delete(publicId).subscribe({
        next: response => {
          console.log(response);
          this.imageGroup()?.get('url')?.setValue('');
          this.imageGroup()?.get('publicId')?.setValue('');
          fileInput.value = '';
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Image successful removed!',
            life: 3000
          });
        }
      });
    } else {
      console.log('Something went wrong!');
    }
  }
}
