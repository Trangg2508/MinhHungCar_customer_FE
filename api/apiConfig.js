export const endpoint = 'https://minhhungcar.xyz';
export const apiAccount = {

    //method: post
    registerCustomer: `${endpoint}/customer/register`,
    verifyOTP: `${endpoint}/user/otp`,
    login: `${endpoint}/login`,


};

export const apiCar = {
    // method: get
    filterCar: `${endpoint}/customer/cars`,
    fetchMetaData: `${endpoint}/register_car_metadata`,

    //method: post
    rentCar: `${endpoint}/customer/rent`,

    //method: put
    agreeContract: `${endpoint}/customer/contract/agree`


}

export const apiPayment = {

}
