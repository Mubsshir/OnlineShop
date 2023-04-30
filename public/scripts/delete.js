const deleteProduct= async(btn)=>{
  let csrf=btn.parentNode.querySelector('[name=_csrf]').value;
  let productID=btn.parentNode.querySelector('[name=productID]').value;
  let productElement=btn.closest('article');
  const res=await fetch('/admin/products/'+productID, {
    method:'DELETE',
    headers:{
      'csrf-token':csrf
    }
  })
  const result=await res.json();
  if(res.ok){
    productElement.remove();
  }else{
    console.log(result)
  }
  
}
