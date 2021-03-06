import {AfterViewInit, Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Subject, Observable, Subscription, timer} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {SwUpdate} from "@angular/service-worker";
import {animate, state, style, transition, trigger} from '@angular/animations';

// ng build --prod --base-href "https://olsanska.github.io/dikynashle/"
// ngh --dir dist/dikynashle
// https://olsanska.github.io/dikynashle/

// http-server -p 8080 -c-1 dist/dikynashle

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // animations: [
  //   trigger('slideInOut', [
  //     state('in', style({
  //       transform: 'translate3d(-100%, 0, 0)'
  //     })),
  //     state('out', style({
  //       transform: 'translate3d(100%, 0, 0)'
  //     })),
  //     transition('in => out', animate('400ms ease-in-out')),
  //     transition('out => in', animate('400ms ease-in-out'))
  //   ]),
  // ]
})
export class AppComponent implements OnInit {

  // menuState:string = 'out';
  public isMenuOpen = false;
  public windowWidth = 500;
  public windowHeight = 500;
  public showWebcam = true;
  public allowCameraSwitch = false;
  public multipleWebcamsAvailable = false;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 812}
  };
  public errors: WebcamInitError[] = [];

  private _countDown!: Subscription;
  counter = 900;
  tick = 1000;

  public webcamImage: WebcamImage | undefined;

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  constructor(private swUpdate: SwUpdate) {}

  public ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if(confirm("New version available. Load New Version?")) {

          window.location.reload();
        }
      });
    }

    console.log(this.windowHeight);
    console.log(this.windowWidth);

    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );

    this._countDown = timer(0, this.tick).subscribe(() => --this.counter);
  }

  public openMenu()
  {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // toggleMenu() {
  //   // 1-line if statement that toggles the value:
  //   // this.isMenuOpen = !this.isMenuOpen;
  //   this.menuState = this.menuState === 'out' ? 'in' : 'out';
  // }

  public reloadPage() {
    window.location.reload();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      "1 : " +
      ("00" + minutes).slice(-2) +
      " : " +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)

    );
  }
}
