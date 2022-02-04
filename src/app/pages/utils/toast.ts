import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Toast {
  status: NbComponentStatus = 'primary';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  private destroyByClick: boolean = true;
  private duration: number = 5000;
  private hasIcon: boolean = true;
  private position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  private preventDuplicates: boolean = false;

  constructor(private toastrService: NbToastrService) {
  }

  public makeToast(status: NbComponentStatus, title: string, content: string) {
    this.showToast(status, title, content);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
