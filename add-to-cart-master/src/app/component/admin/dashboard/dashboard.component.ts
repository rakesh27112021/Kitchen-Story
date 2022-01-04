import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showModal_updatePassword: boolean = true;
  showModal_AddItem: boolean = true;
  adminUpdatePasswordForm : FormGroup;
  itemForm : FormGroup;
  fooditems: product [] | undefined;
  editProduct : boolean = false;

  constructor(
    private router : Router,
    private adminService : ApiService,
    private fb: FormBuilder,
    private fb_fooditem: FormBuilder,
    ) { this.adminUpdatePasswordForm = this.fb.group({
      _id: [''],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }),
    this.itemForm = this.fb_fooditem.group({
      _id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      title : [''],
      description : [''],
      image : [''],
    })}

  ngOnInit(): void {
    this.showModal_updatePassword=true;
    console.log("Line1");
    this.getProducts();
    console.log("Line3")
  }

  getProducts() {
    this.adminService.getProduct().subscribe((response) => {
      console.log(response);
      var info=JSON.parse(JSON.stringify(response));
      this.fooditems=info['doc'];
      console.log("Line2: " +info['username'])
      if (info['username']=="admin"){
        //this.router.navigate(["/admindashboard"]);
      }else{
        this.router.navigate(["/admin/login"]);
      }
    })
  }

  showUpdatePasswordmodal(){
    this.showModal_updatePassword=false;
  }
  closePasswordmodal(){
    this.showModal_updatePassword=true;
  }

  onUpdatePasswordSubmit(){
    this.adminService.updatePassword(this.adminUpdatePasswordForm?.value).subscribe(
      (response)=>{
        var info=JSON.parse(JSON.stringify(response));
        if (info['updateStatus']==1){
          this.showModal_updatePassword=true;
          alert(info['msg']);
        }else{
          alert(info['msg']);
        }
      }
    );
  }

  showAddNewItem(){
    this.editProduct= false;
    this.showModal_AddItem=false;
  }

  closeAddItemmodal(){
    this.showModal_AddItem=true;
  }
  onAddFoosItemSubmit(){
    if (!this.editProduct){
      this.adminService.addProduct(this.itemForm?.value).subscribe(
        (response)=>{
          var info=JSON.parse(JSON.stringify(response));
          this.showModal_AddItem=true;
          this.getProducts();
        }
      )
  }else{
    this.adminService.updateProduct(this.itemForm?.value).subscribe(
      (response)=>{
        var info=JSON.parse(JSON.stringify(response));
        this.showModal_AddItem=true;
        this.getProducts();
      }
    )
  }
}
  onEditFoodItem(product: product){
    this.editProduct= true;
    this.showModal_AddItem=false;
    this.itemForm?.patchValue(product);
  }

  onDeleteFoodItem(id: string){
    if (confirm('Do you want to delete this food item ?')) {
      this.adminService.deleteProduct(id).subscribe(
        (response) => {
          alert('Deleted successfully');
          this.getProducts()
        },
        (err) => { console.log(err) }
      )
    }
  }

}
