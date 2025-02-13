import { Page, Locator, expect } from '@playwright/test';
export class ProductPage {
    readonly page: Page;
    readonly totalQuantityLines: Locator;
    readonly quantityLines: Locator;
    readonly campaign: Locator;
    readonly promotion: Locator;
    readonly tarifa: Locator;
    readonly simSaleType: Locator;
    readonly simProduct: Locator;
    readonly imeiSaleType: Locator;
    readonly imeiProduct: Locator;
    readonly addButton: Locator;
    readonly editButon: Locator;
    readonly punto: Locator;
    readonly numPorta: Locator;
    readonly saveButton: Locator;
    readonly inputProduct: Locator;
    readonly tipoVentaImei: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalQuantityLines = page.getByTestId('product-form-input-quantity-line');
        this.quantityLines = page.getByTestId('form-input-product-line-number');
        this.campaign = page.locator('.act-offer-comercial-grid-row > .form-antd-style > .select > .ant-select > .ant-select-selector > .ant-select-selection-item').first();
        this.tarifa = page.locator('.select-error > .ant-select > .ant-select-selector > .ant-select-selection-item');
        this.simProduct = page.locator('div:nth-child(5) > div:nth-child(2) > .form-antd-style > .select > .ant-select > .ant-select-selector > .ant-select-selection-item');
        this.inputProduct = page.locator('//*[@id="product-commercial-offer-form-select-table-sim-product"]');
        this.imeiSaleType = page.getByTestId('product-commercial-offer-form-imei-type-sale').locator('span').nth(1);
        this.imeiProduct = page.locator('div:nth-child(6) > div:nth-child(2) > .form-antd-style > .select > .ant-select > .ant-select-selector > .ant-select-selection-item');
        this.addButton = page.getByRole('button', { name: 'Agregar' });
        this.punto = page.getByText('T. venta SIM');
        this.editButon = page.getByRole('row', { name: '1 FACIL - CAMPAÑA DE TESTING' }).locator('path').nth(1);
        this.numPorta = page.getByTestId('commercial-ofert-edit-form-porta-num-0');
        this.saveButton = page.getByRole('button', { name: 'Guardar Cambios' });
        this.tipoVentaImei = this.page.locator('[id="product\\.imeiTypeSale-item-\\\'2"]');
    }

    async selectTotalLines() {
        await this.totalQuantityLines.fill('1');
        await this.totalQuantityLines.press('Enter');
        await this.quantityLines.press('Tab');
    }

    async selectCampaing() {
        await this.campaign.click();
        const campana = this.page.locator('#undefined-1');
        await campana.click();
    }

    async selectRate() {
        await this.tarifa.click();
        const tarifaOpcion = this.page.locator('#undefined-0').nth(1);
        await tarifaOpcion.click();
        await this.punto.click();
    }

    async selectProductSIM() {
        await this.simProduct.click();            
        await this.inputProduct.fill('1335');
        const productoSim = this.page.locator('#undefined-310');
        await productoSim.click();
        await this.simProduct.press('Tab');
    }

    async selectTypeSaleIMEI() {    
        await this.imeiSaleType.click();        
        await this.tipoVentaImei.click();
        await this.imeiSaleType.press('Tab');        
    }

    async selectProductIMEI() {
        await this.imeiProduct.click();
        const tipoImei = this.page.locator('#undefined-0').nth(2);
        await tipoImei.click();
        await this.imeiProduct.press('Tab');
        await this.addButton.click();
    }

    async editGrid(datos: any) {
        await this.editButon.click();
        await this.numPorta.fill(datos.numeroPortacion);
        await this.numPorta.press('Tab');
        await this.saveButton.click();
     //   await this.page.waitForTimeout(1000);
        //expect (this.nextButton).toBeEnabled({timeout:10_000});
        //await this.page.waitForTimeout(1000);
    }
}