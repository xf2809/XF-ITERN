describe('login page test', () => {
    it('/login', () => {
        cy.visit('/login');
        cy.get('[data-testid="radio-btn-user"]').click();
        cy.get('[data-testid="radio-btn-user"]').check();

        cy.get('[data-testid="input-box-login"]').click().type('demo@xf.intern');
        cy.get('[data-testid="submit-login-user"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('24689');
        cy.get('[data-testid="otp-verify"]').click().clear();
        cy.get('[data-testid="otp-verify"]').click().type('12345');
        cy.get('[data-testid="otp-submit-btn"]').click();
        cy.wait(10000);
        cy.get('[ data-testid="logout-btn"]').click();
        // admin login
        cy.get('[data-testid="login-btn]').click();
        cy.get('[data-testid="radio-btn-admin"]').click();
        cy.get('[data-testid="radio-btn-admin"]').check();
        cy.get('[data-testid="input-box-login"]').click().type('admin@xf.intern');
        cy.get('[data-testid="submit-login-admin"]').click();
        cy.get('[data-testid="otp-verify"]').click().type('24689');
        cy.get('[data-testid="otp-verify"]').click().clear();
        cy.get('[data-testid="otp-verify"]').click().type('12345');

        
       
    });

})