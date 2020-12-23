import {Selector, t} from 'testcafe';

class RegisterPage{
    constructor(){
        this.GenderOption = Selector('#gender-male')
        this.FirstName = Selector('#FirstName')
        this.LastName = Selector('#LastName')
        this.DateOfBirthDayList = Selector("select[name='DateOfBirthDay']")
        this.DateOfBirthMonthList = Selector("select[name='DateOfBirthMonth']")
        this.DateOfBirthYearList = Selector("select[name='DateOfBirthYear']")
        this.Email = Selector('#Email')
        this.Password = Selector('#Password')
        this.ConfirmPassword = Selector('#ConfirmPassword')
        this.RegisterButton = Selector('#register-button')
        this.SuccessfullMessage = Selector('div.result').withText('Your registration completed');
    }

    async selectDay(day){
        const DayOption = this.DateOfBirthDayList.find('option')
        await t
        .click(this.DateOfBirthDayList)
        .click(DayOption.withText(day));
    }
    async selectMonth(month){
        const DayOption = this.DateOfBirthMonthList.find('option')
        await t
        .click(this.DateOfBirthMonthList)
        .click(DayOption.withText(month));
    }
    async selectYear(year){
        const DayOption = this.DateOfBirthYearList.find('option')
        await t
        .click(this.DateOfBirthYearList)
        .click(DayOption.withText(year));
    }
}
export default new RegisterPage();