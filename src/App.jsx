import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { data } from './Data';

function App() {
  const [count, setCount] = useState(0);
  const [dataVal, setDataVal] = useState(data);

  useEffect(()=> {
      data.map((val) => {val.Variance = 0; val.input = 0; val.children.map((value) => {value.Variance = 0;val.input = 0;})});
      setDataVal(data);
      console.log(data);
  },[]);



  const calculateAllocationPer = (Prow,Crow,Pindex,Cindex,type) => {
    if(type == 'parent'){
      
    }else{
      console.log('cjild allowcation');
      
      // (10/100) * 800
      if(Crow.input > 0){
        const val = Crow.value + (Crow.input / 100) * Crow.value;
        const data2 = data;
        console.log(data2);
        
        console.log(val);
        data2[Pindex].children[Cindex].value = val;
        data2[Pindex].children[Cindex].Variance = Crow.input;
        // data.map((val) => {val.Variance = 0; val.input = 0; val.children.map((value) => {value.Variance = 0;val.input = 0;})});
        // data.map(val => ) 

        // const sum = 0;
        // data[Pindex].children.forEach(v =>{
        //   sum + v.value;
        //   console.log(v.value, ' :val')
        // } 
        // );
        const sum = data2[Pindex].children.reduce((acc,val) => {
          return acc + val.value;
        },0)
        console.log('sum : ',sum);

        const diff = sum - Prow.value;
        console.log('Prow.value : ',Prow.value, 'difff ;', diff);
        
        // 80/1500 * 100 = 5.33%
        console.log('parent % : ',(diff/ Prow.value) * 100);
        
        data2[Pindex].value = sum;
        data2[Pindex].Variance = ((diff/ Prow.value) * 100).toFixed(2);
        console.log(data2,'dinal ');

        setDataVal(data2);
        // setValUpdate((prev) => !prev);
      }
    }
  }

  function calculateAllocationVal(row,type) {
    
  }

  function assignVal(e,row,index,type) {
    // console.log('e : ',e.target.value);
    if(type == 'parent'){
      // data.forEach((val,_,arr) => 
      //   arr.
      // )
      data.map((val) => 
      val.input = e.target.value);
      // console.log();
      // const index = data.findIndex((val) => val.id == row.id);
      data[index].input = e.target.value;
    }else{
      const Pindex = data.findIndex((val) => val.id == row.id);
      // data[Pindex].children.findIndex((val) => val.id == row.id);
      data[Pindex].children[index].input = e.target.value;
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              Label
            </td>
            <td>
              Value
            </td>
            <td>
              Input
            </td>
            <td>Allocation %</td>
            <td>Allocation Val</td>
            <td>
              Variance %
            </td>
          </tr>
        </thead>
        <tbody>
          {
            dataVal && 

            (
              dataVal.map((val,index) => (
                <>
                <tr key={`${val.id}`}>
                  <td>{val.label}</td>
                  <td>{val.value}</td>
                  <td><input type="number" name="" id="" value={val.input} onChange={(e) => assignVal(e,val,index,'parent')}/></td>
                  <td><button onClick={(e) => calculateAllocationPer(val,{},index,0,'parent')}>Calculate Allocation %</button></td>
                  <td><button onClick={(e) => calculateAllocationVal(val,'parent')}>Calculate Allocation Val</button></td>
                  <td>{val.Variance}%</td>
                  
                </tr>
                {
                  val.children.map((detail,ind) => (
                    <tr key={`${detail.id}`}>
                      <td>-- {detail.label}</td>
                      <td>{detail.value}</td>
                      <td><input type="number" name="" id="" value={detail.input} onChange={(e) => assignVal(e,val,ind,'child')}/></td>
                      <td><button onClick={(e) => calculateAllocationPer(val,detail,index,ind,'child')}>Calculate Allocation %</button></td>
                      <td><button onClick={(e) => calculateAllocationVal(val,'child')}>Calculate Allocation Val</button></td>
                      <td>{detail.Variance}%</td>
                    </tr>
                  ))
                }
                </>
              )
              )
            )
          }
          
        </tbody>
      </table>
    </>
  )
}

export default App
