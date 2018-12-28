class Index {
  constructor (i, j){
    this.i = i;
    this.j = j;
   
  }
  
 

  set (index){
    this.i = index.i;
    this.j = index.j;

    return this;
  }

  equal (index){
    if ( this.i == index.i && this.j == index.j)
      return true;

    return false;
    
  }
}