import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BusinessPage } from '../pages/business.page';
import data from '../data/testData.json';
import { HomePage } from '../pages/home.page';
import { ClientPage } from '../pages/client.page';
import { ProductPage } from '../pages/product.page';

test.describe('Regresión de ASM - Alta de Servicios Móviles', () => {
    test('ASM - Portación DNI @PACT-1234', async ({ page }) => {
        const homePage = new HomePage(page);
        const productTab = new ProductPage(page);

        await test.step('Login en ASM', async () => {
            const loginPage = new LoginPage(page);
            await loginPage.loginWithCredentials();
            await expect(homePage.titleIsVisible).toBeTruthy();
            await expect(page).toHaveURL(/.*negocio/);
        });

        await test.step('Completar Datos Entidad', async () => {
            const businessTab = new BusinessPage(page);
            await businessTab.searchForBusiness(page, data);
            await expect(homePage.loaderIsHidden).toBeTruthy();
            await expect(page).toHaveURL(/.*cliente/);
        });

        await test.step('Completar Datos del cliente', async () => {
            const clientTab = new ClientPage(page);
            await clientTab.fillClientId(data);
            await expect(homePage.loaderIsHidden).toBeTruthy();            
            await clientTab.fillClientData(data);            
            await expect(page).toHaveURL(/.*producto/);
        })
                        
        await test.step('Seleccionar oferta comercial', async () => {            
            await productTab.selectTotalLines();
            await productTab.selectCampaing();
            await productTab.selectRate();
            await expect(homePage.loaderIsHidden).toBeTruthy();
            await productTab.selectProductSIM();
            await productTab.selectTypeSaleIMEI();
            await expect(homePage.loaderIsHidden).toBeTruthy();
            await productTab.selectProductIMEI();            
        })

        await test.step('Edito la grilla de oferta comercial', async () => {
            await productTab.editGrid(data);
            await expect(homePage.loaderIsHidden).toBeTruthy();
            await expect(homePage.buttonNextIsEnabled).toBeTruthy();
            await homePage.clickOnNextButton();
            await expect(page).toHaveURL(/.*facturacion/);
        })
        
        await test.step('Cierro Sesión', async () => {
            await homePage.logout();
            await expect(page).toHaveURL(/.*login/);
        })
    });


    // test('ASM - Test Case para fallo', async ({ page }) => {
    //     const homePage = new HomePage(page);

    //     await test.step('Login en ASM', async () => {
    //         const loginPage = new LoginPage(page);
    //         await loginPage.loginWithCredentials();
    //         await expect(homePage.titleIsVisible).toBeTruthy();
    //         await expect(page).toHaveURL(/.*fail/);
    //     });  
    // })
    
})


