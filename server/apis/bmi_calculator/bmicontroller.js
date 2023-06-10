

function bmi_calculator(req,res)
{
  // console.log("1");
  let height=parseInt(req.body.height);
  let weight=parseInt(req.body.weight);

  let calc_bmi=calculatebmi(weight,height)

  let bmi_status=bmistatus(calc_bmi)

  res.json({
    bmi:calc_bmi,
    bmistatus:bmi_status
  })
}


function calculatebmi(weight,height)
{
  let bmi=((weight/(height*height))*10000).toFixed(2)
  return bmi;
}

function bmistatus(bmi)
{
  let status;
  if(bmi<16)
  {
    status="Severe Thinness"
  }
  else if(bmi>=16 && bmi<17)
  {
    status="Moderate Thinness"
  }
  else if(bmi>=17 && bmi<18.5)
  {
    status="Mild Thinness"
  }
  else if(bmi>=18.5 && bmi<25)
  {
    status="Normal"
  }
  else if(bmi>=25 && bmi<30)
  {
    status="Overweight"
  }
  else if(bmi>=30 && bmi<35)
  {
    status="Obese Class I"
  }
  else if(bmi>=35 && bmi<40)
  {
    status="Obese Class II"
  }
  else if(bmi>=40)
  {
    status="Obese Class III"
  }
  return status;
}
module.exports= {bmi_calculator}
