import { Component, OnInit } from '@angular/core';
import { ProfService } from 'src/app/_services/prof.service';
declare var $: any;

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  submitted = false;
  data={
     data1:"",
     data2:"",
     data3:"",

   }
   datas={
    data1:"",
    data2:"",
    data3:"",

  }
  profsseurData:any;
   prof:any;
  constructor(private profService:ProfService) { }

  ngOnInit(): void {
    this.profService.getProfs().subscribe((res:Response)=>{
      this.prof=res
    });
  }
// add data province avec cle etranger region
 // add data centre Formation 
 onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.submitted) {
    const datas = {
      nom: this.data.data1,
      prenom: this.data.data2,
      grade: this.data.data3,
     
    };
    this.profService.addProf(datas)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
        window.location.reload();
  }
}
delete(id){
  this.profService.deleteProf(id).subscribe(
    response => {
      console.log(response);
      this.submitted = true;
    },
    error => {
      console.log(error);
    });
    window.location.reload();
}
onSubmitEdit(){
  this.submitted = true;
  // stop here if form is invalid

  //True if all the fields are filled
  if (this.submitted) {
    const datas = {
      nom: this.datas.data1,
      prenom: this.datas.data2,
      grade: this.datas.data3,
     
    };
    this.profService.updateProf(this.userID, datas).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
    $("#showModule").modal("hide");
    
   window.location.reload();
  }
}
showCFormation= false;
userID: any;
update(id) {
  //centre Formation details post request
  this.profService.getProf(id);
  setTimeout(() => {
    this.profsseurData = this.profService.singleProffeseurData;
    this.datas.data1 = this.profsseurData.nom;
    this.datas.data2 = this.profsseurData.prenom;
    this.datas.data3= this.profsseurData.grade;   
      
    this.userID = this.profsseurData.id;
    this.showCFormation = true;
  }, 500);
  setTimeout(() => {
    $("#showModule").modal("show");
  }, 800);

}
}
