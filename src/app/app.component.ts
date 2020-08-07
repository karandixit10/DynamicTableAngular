import { Component, OnInit } from '@angular/core';
import { DynamicGrid } from './grid.model';

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
    this.newDynamic = {
    Name: '',
    Qnt: '',
    Rate: '',
    Value: '',
    Discount: '',
    Discountmode: 'flat',
    Discounted_Price: '',
    Tax: '',
    Tax_value: '',
    Total: '',
  };
    this.dynamicArray.push(this.newDynamic);
}
  addRow() {
    this.newDynamic = {
      Name: '',
      Qnt: '',
      Rate: '',
      Value: '',
      Discount: '',
      Discountmode: 'flat',
      Discounted_Price: '',
      Tax: '',
      Tax_value: '',
      Total: '',
    };
    this.dynamicArray.push(this.newDynamic);
    console.log(this.dynamicArray);
    return true;
  }


  onDelete(index) {
    if(this.dynamicArray.length === 1) {
        return false;
    } else {
        this.dynamicArray.splice(index, 1);
        return true;
    }
  }
  submit(myForm){
    console.log('form submitted!', myForm);
  }

  calcall(){
    var i;
    for(i = 0; i<this.dynamicArray.length; i++){
      this.dynamicArray[i].Value = this.dynamicArray[i].Qnt * this.dynamicArray[i].Rate;
      if(this.dynamicArray[i].Discountmode === 'flat'){
        var disval = this.dynamicArray[i].Discount;
      }else{
        var disval = (this.dynamicArray[i].Value * this.dynamicArray[i].Discount) / 100;
      }
      this.dynamicArray[i].Discounted_Price = this.dynamicArray[i].Value - disval;
      this.dynamicArray[i].Tax_value = (this.dynamicArray[i].Discounted_Price * this.dynamicArray[i].Tax ) / 100;
      this.dynamicArray[i].Total =  this.dynamicArray[i].Discounted_Price + this.dynamicArray[i].Tax_value;
    }
  }

  subtotal(){
      var total = 0;
      this.dynamicArray.forEach(function(item){
        total += (item.Qnt * item.Rate);
      });
      return total;
    };

  discTotal(){
      var disctotal = 0;
      if(this.newDynamic.Discountmode === 'flat'){
        this.dynamicArray.forEach(function(item){
          disctotal += (item.Qnt * item.Rate) - item.Discount;
        });
      }
      else{
        this.dynamicArray.forEach(function(item){
          disctotal += (item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01)));
        });
      }
      return disctotal;
    }

  taxTotal(){
    var taxT=0;
    if(this.newDynamic.Discountmode === 'flat'){
      this.dynamicArray.forEach(function(item){
        taxT += ((item.Qnt * item.Rate - item.Discount) * (item.Tax * 0.01));
      });
    }
    else{
      this.dynamicArray.forEach(function(item){
        taxT += ((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01))) * (item.Tax * 0.01));
      });
    }

    return taxT;
  }

  finalP(){
    if(this.newDynamic.Discountmode === 'flat'){
      var final = 0;
      this.dynamicArray.forEach(function(item){
      final += ((item.Qnt * item.Rate - item.Discount) + (((item.Qnt * item.Rate - item.Discount) * (item.Tax * 0.01))));
    });
    }else{
      var final = 0;
      this.dynamicArray.forEach(function(item){
      final += ((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01)))) + (((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01))) * (item.Tax * 0.01)));
    });
    }

    return final;
  }

  }
