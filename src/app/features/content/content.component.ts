import { Component } from '@angular/core';
import { AxiosService } from '../../service/axios.service';
import { ErrorHandlingComponent } from '../../common/error-handling/error-handling.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
	componentToShow: string = "welcome";

	constructor(private axiosService: AxiosService,
    private dialog: MatDialog
  ) { }

	showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/signIn",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
		);

	}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
          console.log("Rishabh",error.response);
          console.log("Rishabh message-",error.response.data.message);
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
            this.openErrorDialog(error.response.data.message || 'An unknown error occurred');
		    }
		);
	}
  openErrorDialog(errorMessage: string) {
    this.dialog.open(ErrorHandlingComponent, {
      data: { message: errorMessage }
    });
  }
}
