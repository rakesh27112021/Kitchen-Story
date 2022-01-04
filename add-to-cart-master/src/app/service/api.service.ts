import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { admin } from '../models/admin';
import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:3000'

  adminlogin(admin:admin){
    return this.http.post<any>(this.url+"/admin/login", admin,{withCredentials: true});
  }
  updatePassword(admin: admin){
    return this.http.put<any>(`${this.url}admin/updatepassword/`,admin,{withCredentials: true});
  }

  addProduct(product: product){
    return this.http.post(this.url + '/admin/addproduct',product,{withCredentials: true})
  }

  getProduct(){
    return this.http.get<any>(this.url+"/admin/getproducts",{withCredentials: true})
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateProduct(product:product){
    return this.http.put(`${this.url}/admin/updateProduct/${product._id}`, product,{withCredentials: true});
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.url}/admin/deleteProduct/${id}`,{withCredentials: true});
  }


  endusergetProduct(){
    return this.http.get<any>(this.url+"/products",{withCredentials: true})
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
