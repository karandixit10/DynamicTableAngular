import { Component, OnInit } from '@angular/core';
import { DynamicGrid } from './grid.model';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {

  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};


  constructor(){

  }

  ngOnInit(): void {
    this.newDynamic = { Name: '',
    Qnt: '',
    Rate: '',
    Value: '',
    Discount: '',
    Discounted_Price: '',
    Tax: '',
    Tax_value: '',
    Total: '',
  };
    this.dynamicArray.push(this.newDynamic);
}


addRow() {
  this.newDynamic = { Name: '',
    Qnt: '',
    Rate: '',
    Value: '',
    Discount: '',
    Discounted_Price: '',
    Tax: '',
    Tax_value: '',
    Total: '',
  };
  this.dynamicArray.push(this.newDynamic);
  // return true;
  console.log(this.dynamicArray);
}
onDelete(index) {

    this.dynamicArray.splice(index, 1);
    return true;

}
totalValue() {
  var total = this.newDynamic.Qnt * this.newDynamic.Rate;
  this.newDynamic.Value = total;
  return total ;
}

discountedValue(){
  var disc = this.totalValue() - ((this.totalValue()) * (this.newDynamic.Discount) * 0.01 ) ;
  this.newDynamic.Discounted_Price = disc;
  return disc;
}

tax(){
   var taxPrice = this.discountedValue() * this.newDynamic.Tax * 0.01 ;
   this.newDynamic.Tax_value = taxPrice;
   return taxPrice;
}
grandTotal(){
   var grandT =  this.discountedValue() + this.tax();
   this.newDynamic.Total = grandT;
   return grandT;
}

}
