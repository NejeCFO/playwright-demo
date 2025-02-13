import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly loader: Locator;
    readonly buttonNext: Locator;
    readonly buttonBack: Locator;
    readonly buttonLogout: Locator

    constructor(page: Page) {
        this.page = page;
        this.title = page.getByText('ASM - Alta de Servicios Mó');
        this.loader = page.getByTestId('loadingOverlay').locator('span');
        this.buttonNext = page.getByRole('button', { name: 'Siguiente' });
        this.buttonLogout = page.getByTestId('item-lower-btn-logout');
    }

    async titleIsVisible() {
        return await this.title.isVisible();
    }

    async loaderIsHidden() {
        return await this.loader.isHidden();
    }

    async buttonNextIsEnabled() {
        return await this.buttonNext.isEnabled();
    }

    async clickOnNextButton() {
        await this.buttonNext.click();
    }

    async logout() {    
        await this.buttonLogout.click();
    }
}