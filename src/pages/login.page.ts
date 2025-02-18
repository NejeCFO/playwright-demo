import { Page, Locator } from 'playwright';
export class LoginPage {
    readonly page: Page;
    readonly user :Locator;
    readonly pass :Locator;
    readonly ingresarButton:Locator;     

    constructor (page: Page) {
        this.page = page;
        this.ingresarButton= page.getByRole('button', { name: 'INGRESAR' });
        this.user=page.getByRole('textbox', { name: 'Introduzca el usuario' });
        this.pass=page.getByRole('textbox', { name: 'Introduzca la contraseña' });        
    }

    async navigate(){
        const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://test-asm.claro.com.ar/';
        await this.page.goto(baseUrl);
        
    }

    async loginWithCredentials() {
        const username = process.env.USER_NAME;
        const password = process.env.USER_PASSWORD;
  
        if (!username || !password) {
            throw new Error('Las variables de entorno USUARIO y PASSWORD deben estar definidas');
        }
    
        await this.navigate();
        await this.user.fill(username);
        await this.ingresarButton.click();
        await this.pass.fill(password);
        await this.ingresarButton.click();        
        await this.page.waitForLoadState('domcontentloaded')
    }
}