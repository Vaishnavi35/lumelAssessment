import React, { useEffect, useState } from 'react'
import './App.css';
import { data } from './Data';

function App() {
  const [dataVal, setDataVal] = useState(data);

  useEffect(()=> {
      data.map((val) => {val.Variance = 0; val.input = 0; val.children.map((value) => {value.Variance = 0;value.input = 0;})});
      setDataVal(data);
      console.log(data);
  },[]);

useEffect(() => {
  console.log('dataVal',dataVal);
  
},[dataVal])

  const calculateAllocationPer = (Prow,Crow,Pindex,Cindex,type) => {
    if(type == 'parent'){
      
    }else{
      console.log('cjild allowcation : ', Crow.input);
      
      if(Crow.input > 0){
        const Cnewval = Crow.value + (Crow.input / 100) * Crow.value;
        const data2 = data;
        console.log(data2);
        
        console.log(Cnewval);

        const Pnewval = Prow.children.reduce((acc,val) => {
          console.log('acc',acc,' crow.id : ',Crow.id, ' val.id : ',val.id);
          console.log('val',val);
          
          if(val.id != Crow.id){
          console.log('val',val.value);
            
              acc = acc + val.value;
            console.log('added', acc);

          }
          return acc;
        },Cnewval);
        console.log('Pnewval : ',Pnewval);

        const diff = Pnewval - Prow.value;
        console.log('Prow.old value : ',Prow.value, 'difff ;', diff);
        
        console.log('parent % : ',(diff/ Prow.value) * 100);
        const Pnewvariance = ((diff/ Prow.value) * 100).toFixed(2);
        console.log(data2,'dinal ');
        const childValueCalc = dataVal.map(Pval => {
            if(Pval.id == Prow.id){
              return {...Pval, value: Pnewval, Variance: Pnewvariance,children: Pval.children.map(Cval => {
                if(Cval.id == Crow.id){
                  return {...Cval, value: Cnewval, Variance: Cval.input}
                }
                return Cval;
              })}
            }
            return Pval;
        })
        setDataVal(childValueCalc);
      }
    }
  }

  function calculateAllocationVal(row,type) {
    
  }

  function assignVal(e,Prow,Crow,type) {
    if(type == 'parent'){
      const updateInputVal = dataVal.map((val) => {
        if(val.id == Prow.id){
          return {...val, input: e.target.value}
        }
        return val;
      });
      setDataVal(updateInputVal);
    }else{
      const updateInputVal = dataVal.map((val) => {
        if(val.id == Prow.id){
          return {...val, children: 
          val.children.map(value => {
            if(value.id == Crow.id){
              return { ...value, input: parseInt(e.target.value)}
            }
            return value;
          })
        }
        }
        return val;
      });
      setDataVal(updateInputVal);
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
                <React.Fragment key={`${val.id}`}>
                <tr>
                  <td>{val.label}</td>
                  <td>{val.value}</td>
                  <td><input type="number" name="" id="" onChange={(e) => assignVal(e,val,index,'parent')}/></td>
                  <td><button onClick={(e) => calculateAllocationPer(val,{},index,0,'parent')}>Calculate Allocation %</button></td>
                  <td><button onClick={(e) => calculateAllocationVal(val,'parent')}>Calculate Allocation Val</button></td>
                  <td>{val.Variance}%</td>
                </tr>
                {
                  val.children.map((detail,ind) => (
                    <tr key={`${ind}`}>
                      <td>-- {detail.label}</td>
                      <td>{detail.value}</td>
                      <td><input type="number" name="" id="" onChange={(e) => assignVal(e,val,detail,'child')}/></td>
                      <td><button onClick={(e) => calculateAllocationPer(val,detail,index,ind,'child')}>Calculate Allocation %</button></td>
                      <td><button onClick={(e) => calculateAllocationVal(val,'child')}>Calculate Allocation Val</button></td>
                      <td>{detail.Variance}%</td>
                    </tr>
                  ))
                }
                </React.Fragment>
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
