const { createConnection } = require('typeorm');
require('dotenv').config();
let num = 0;
const pull_data = async (data) => {
  try {
    num += 1;
    const connection = await createConnection({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const front_url = 'https://raw.githubusercontent.com/Teachsue/Image_URL/main/';
    //F P T : products.sub_category_id
    //첫번째 숫자 : sub_category_id
    //마지막 숫자 : surface_type_id
    let sub_category_id = 0;
    
    if(data[0] == 'P'){
         sub_category_id = parseInt(data[2]);
    }else if(data[0] == 'W'){
         sub_category_id = parseInt(data[2]) + 5;
    }else if(data[0] == 'F'){
         sub_category_id = parseInt(data[2])+ 7;
    }
    let name = data.substring(0,10);
    let surface_type_id = data[11];
    let weight = 0;
    let price = 0;
    if(sub_category_id == 1){
        price = 30000;
        weight = 30;
    }else if(sub_category_id == 2){
        price = 35000;
        weight = 35;
    }else if(sub_category_id == 3){
        price = 25000;
        weight = 25;
    }else if(sub_category_id == 4){
        price = 75000;
        weight = 75;
    }else if(sub_category_id == 5){
        price = 25000;
        weight = 25;
    }else if(sub_category_id == 6){
        price = 30000;
        weight = 30;
    }else if(sub_category_id == 7){
        price = 25000;
        weight = 25;
    }else if(sub_category_id == 8){
        price = 30000;
        weight = 30;
    }else if(sub_category_id == 9){
        price = 25000;
        weight = 25;
    }
    let image_url = front_url + data;
    await connection.query(
      ` 
      INSERT INTO products( sub_category_id, name, surface_type_id, price, weight, image_url)
      VALUES (${sub_category_id},'${name}',${surface_type_id},${price},${weight},'${image_url}')
      `
    );

    await connection.close();

    //console.log(`Data inserted for index ${num}`);
  } catch (err) {
    console.error(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

for(let i=1;i<=5;i++){
    pull_data('F_1_LJH_0'+String(i)+'_3.jpg')
}
for(let i=1;i<=4;i++){
    pull_data('F_2_KSW_0'+String(i)+'_3.jpg')
}
for(let i=5;i<=6;i++){
    pull_data('F_2_KSW_0'+String(i)+'_2.jpg')
}
for(let i=1;i<=9;i++){
    pull_data('P_1_CTN_0'+String(i)+'_1.jpg')
}
for(let i=10;i<=17;i++){
    pull_data('P_1_CTN_'+String(i)+'_1.jpg')
}
for(let i=18;i<=27;i++){
    pull_data('P_1_CTN_'+String(i)+'_2.jpg')
}
for(let i=28;i<=35;i++){
    pull_data('P_1_CTN_'+String(i)+'_3.jpg')
}
for(let i=28;i<=35;i++){
    pull_data('P_1_CTN_'+String(i)+'_3.jpg')
}
for(let i=36;i<=38;i++){
    pull_data('P_1_CTN_'+String(i)+'_4.jpg')
}
for(let i=39;i<=40;i++){
    pull_data('P_1_CTN_'+String(i)+'_5.jpg')
}
for(let i=1;i<=5;i++){
    pull_data('P_2_SDH_0'+String(i)+'_1.jpg')
}
for(let i=1;i<=2;i++){
    pull_data('P_3_JSN_0'+String(i)+'_3.jpg')
}
for(let i=3;i<=3;i++){
    pull_data('P_3_JSN_0'+String(i)+'_4.jpg')
}
pull_data('P_3_JSN_04_1.jpg')
pull_data('P_3_JSN_05_2.jpg')
for(let i = 1;i<=2;i++){
    pull_data("P_4_KSJ_0"+String(i)+"_1.jpg")
}
for(let i=3;i<=5;i++){
    pull_data("P_4_KSJ_0"+String(i)+"_2.jpg")
}
for(let i=1;i<=2;i++){
    pull_data("P_5_LJH_0"+String(i)+"_4.jpg")
}
for(let i=3;i<=6;i++){
    pull_data("P_5_LJH_0"+String(i)+"_1.jpg")
}
for(let i=1;i<=6;i++){
    pull_data("W_1_SDH_0"+String(i)+"_1.jpg")
}
for(let i=7;i<=8;i++){
    pull_data("W_1_SDH_0"+String(i)+"_2.jpg")
}
pull_data("W_1_SDH_09_5.jpg");
pull_data("W_1_SDH_10_5.jpg");
for(let i=1;i<=6;i++){
    pull_data("W_2_LJH_0"+String(i)+"_5.jpg")
}