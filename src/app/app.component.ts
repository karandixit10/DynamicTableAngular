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
  disableBtn = false;
  flag = true;
  constructor(){

  }

  ngOnInit(): void {
    this.flag= false;
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

dis(value: string){
  switch(value){
    case 'flat':{
      var flat = this.totalValue() - this.newDynamic.Discount;
      this.newDynamic.Discounted_Price = flat;
      this.flag = false;
      return flat;
      break;
    }
    case 'perc':{
      var perc = this.totalValue() - ((this.totalValue()) * (this.newDynamic.Discount) * 0.01 ) ;
      this.newDynamic.Discounted_Price = perc;
      return perc;
      break;

    }

  }
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
  console.log(this.dynamicArray);
  this.disableBtn = true;
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

tax(value){
   var taxPrice = this.newDynamic.Discounted_Price() * this.newDynamic.Tax * 0.01 ;
   this.newDynamic.Tax_value = taxPrice;
   return taxPrice;
}

// grandTotal(){
//    var grandT =  this.discountedValue() + this.tax();
//    this.newDynamic.Total = grandT;
//    return grandT;
// }

subtotal(){
    var total = 0;
    this.dynamicArray.forEach(function(item){
      total += (item.Qnt * item.Rate);
    });
    return total;
  };

  discTotalPerc(){
    var disctotal = 0;
    this.dynamicArray.forEach(function(item){
      disctotal += (item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01)));
    });
    this.flag = !this.flag;
    return disctotal;
  }

  discTotalFlat(){
    var disctotal = 0;

    this.dynamicArray.forEach(function(item){
      disctotal += (item.Qnt * item.Rate - (item.Discount ));
    });
    return disctotal;
  }

  taxTotal(){
    var taxT=0;
    this.dynamicArray.forEach(function(item){
      taxT += ((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01))) * (item.Tax * 0.01));
    });
    return taxT;
  }

  finalP(){
    var final = 0;
    this.dynamicArray.forEach(function(item){
      // tslint:disable-next-line: max-line-length
      final += ((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01)))) + (((item.Qnt * item.Rate - (item.Qnt * item.Rate * (item.Discount * 0.01))) * (item.Tax * 0.01)));
    });
    return final;
  }

}
