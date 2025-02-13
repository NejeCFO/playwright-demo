import { Page, Locator } from "@playwright/test";
export class BusinessPage {
    readonly page: Page;
    readonly entidad: Locator;
    readonly dniSeller: Locator;
    readonly pos: Locator;
    readonly nextButton: Locator;
    readonly salesType: Locator;
    readonly actualBusiness: Locator;
    readonly posFirstOption: Locator;


    constructor(page: Page) {
        this.page = page;
        this.entidad = page.getByTestId('input-form-business-entity');
        this.dniSeller = page.getByTestId('input-form-business-num-doc-seller');
        this.pos = page.getByTestId('select-form-business-pos').locator('div').nth(1);
        this.nextButton = page.getByRole('button', { name: 'Siguiente' });
        this.salesType = page.getByTestId('select-form-business-sale-type').locator('div').nth(1);
        this.actualBusiness = page.getByTestId('select-form-business-business-porta').locator('span').nth(1);
        this.posFirstOption = page.locator(`[id="entity\\.pos-item-\\'0"]`);
    }

    async selectPosById(page: Page, id: number) {
        await this.pos.click();
        const posOption = page.locator(`[id="entity\\.pos-item-\\'${id}"]`);
        await posOption.click();
    }

    async selectSalesTypeById(page: Page, option: number) {
        await this.salesType.click();
        const salesTypeOption = page.locator(`[id="salesSelected\\.typeSale-item-\\\'${option}"]`);
        await salesTypeOption.click();
    }

    async selectBusinessOptionById(page: Page, option: number) { 
        await this.actualBusiness.click();
        const actualBusinessOption = page.locator(`[id="porta\\.businessPorta-item-\\\'${option}"]`);
        await actualBusinessOption.click();
      }

    async searchForBusiness(page: Page,  datos: any) {
        if (!datos.entity || !datos.dniVendedor) {
            throw new Error('Los datos para entityTab son inválidos o incompletos');
        }    
        await this.entidad.fill(datos.entity);
        await this.entidad.press('Tab');
        await this.dniSeller.fill(datos.dniVendedor);
        await this.dniSeller.press('Tab');
        await this.selectPosById(page, datos.pos);
        await this.selectSalesTypeById(page, datos.sales);
        await this.selectBusinessOptionById(page, datos.businessPorta);        
        await this.nextButton.click();        
    }

}