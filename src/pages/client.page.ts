import { Page, Locator } from "@playwright/test";
export class ClientPage {
    readonly page: Page;
    readonly clientDni: Locator;
    readonly loader: Locator;
    readonly clientName: Locator;
    readonly clientSurname: Locator;
    readonly clientRisk: Locator;
    readonly clientScoring: Locator;
    readonly clientDebt: Locator;
    readonly clientFirstAccount: Locator;
    readonly clientEmail: Locator;
    readonly clientPrefix: Locator;
    readonly clientPhone: Locator;
    readonly nextButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clientDni = page.getByTestId('form-input-client-document-number');
        this.loader = page.getByTestId('loadingOverlay').locator('span');
        this.clientName = page.getByTestId('form-input-client-name');
        this.clientSurname = page.getByTestId('form-input-client-surname');
        this.clientRisk = page.getByText('RiesgoB');
        this.clientScoring = page.getByText('Scoring1');
        this.clientDebt = page.getByText('Deuda$');
        this.clientFirstAccount = page.getByTestId('1').nth(0);
        this.clientEmail = page.getByTestId('act-cliente-form-select-additional-email');
        this.clientPrefix = page.getByTestId('act-cliente-form-input-additional-phone-area');
        this.clientPhone = page.getByTestId('act-cliente-form-input-additional-phone');
        this.nextButton = page.getByRole('button', { name: 'Siguiente' });
    }

    async fillClientId(datos: any) {
        await this.clientDni.fill(datos.dniCliente);
        await this.clientDni.press('Tab');
    }

    async fillClientData(datos: any) {
        await this.clientFirstAccount.click();
        await this.clientEmail.click();
        const email = this.page.locator(`[id="additional\\.email-item-\\\'${datos.emailCliente}"]`);
        await email.click();
        await this.clientPrefix.fill(datos.prefijoCliente);
        await this.clientPhone.fill(datos.celular);
        await this.nextButton.click();
    }

}