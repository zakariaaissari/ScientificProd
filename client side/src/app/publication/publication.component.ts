import { Component, OnInit } from '@angular/core';
import { PublicationService} from 'src/app/_services/publication.service';
import{Publication} from 'src/app/_models/publication';
declare var $: any;
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  submitted = false;
  data={
     data1:"",
     data2:"",
     data3:"",
     data4:""
   }
   datas={
    data1:"",
    data2:"",
    data3:"",
    data4:""
  }
  publicationData:any;
   prof:any=[];
  constructor(private publicationService:PublicationService) { }

  ngOnInit(): void {
    this.publicationService.getPublications().subscribe((res:Response)=>{
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
      titre: this.data.data1,
      annee: this.data.data2,
      type_revu: this.data.data3,
      journal:this.data.data4
    };
    this.publicationService.addPublication(datas)
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
  this.publicationService.deletePublication(id).subscribe(
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
      titre: this.datas.data1,
      annee: this.datas.data2,
      type_revu: this.datas.data3,
      journal:this.datas.data4
    };
    this.publicationService.updatePublication(this.userID, datas).subscribe(
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
  this.publicationService.getPublication(id);
  setTimeout(() => {
    this.publicationData = this.publicationService.singlePublicationData;
    this.datas.data1 = this.publicationData.titre;
    this.datas.data2 = this.publicationData.annee;
    this.datas.data3= this.publicationData.type_revu;   
    this.datas.data4= this.publicationData.journal;    
    this.userID = id;
    this.showCFormation = true;
  }, 500);
  setTimeout(() => {
    $("#showModule").modal("show");
  }, 800);

}}

