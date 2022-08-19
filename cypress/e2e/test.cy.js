

describe('Test', () => {
    beforeEach('Open page and login', () => {
        const url = 'https://dev-company.profesi.io';
        const userName = 'recruitmentqaprofesi@yopmail.com';
        const password = 'Qapr0fes1';

        cy.clearCookies()
        cy.visit(url, {timeout:10000});
        cy.viewport(1240, 1000);
        cy.get('.vs-inputx').first().type(userName);
        cy.get('.vs-inputx').last().type(password);

        cy.get('[data-cy=login-btn-login]').click();
        cy.contains('Selamat datang kembali, Profesi.io Recruitment!').should('be.visible');
        cy.contains('Buat Asesmen').parent().click();
        cy.url().should('eq','https://dev-company.profesi.io/assessments/create');
    })

    it('Create assessment using valid data (Draft)', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');
        
        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();
        cy.get(':nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)').type('Messi');
        cy.wait(500);
        cy.contains('Messi').first().parent().click();
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();

        cy.contains('Bobot Asesor').scrollIntoView().click();
        cy.get('.open-item .vs-inputx').eq(0).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(1).clear().type('100');
        cy.get('.open-item .vs-inputx').eq(2).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(3).clear().type('0');
        cy.get('[data-cy=btn]').eq(1).click();
        cy.get('[data-cy=btn]').contains('Draft').parent().click();

        cy.contains('Berhasil').should('be.exist');
        cy.url().should('eq', 'https://dev-company.profesi.io/assessments');
        cy.contains('Berhasil').should('be.not.exist');
    });

    it('Create assessment without inputs all mandatory fields', () => {
        cy.get('[data-cy=btn]',{timeout:8000}).contains('Draft').parent().should('have.attr', 'disabled', 'disabled');
        cy.get('[data-cy=btn]').contains('Publikasi').parent().should('have.attr', 'disabled', 'disabled');
        cy.contains('Form isian belum diisi dengan benar.').should('be.visible');
    })

    it('Create assessment without input Judul asesment fields', ()=>{
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();
        cy.get(':nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)').type('Messi');
        cy.wait(1000);
        cy.contains('Messi').first().parent().click();
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();

        cy.contains('Bobot Asesor').scrollIntoView().click();
        cy.get('.open-item .vs-inputx').eq(0).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(1).clear().type('100');
        cy.get('.open-item .vs-inputx').eq(2).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(3).clear().type('0');
        cy.get('[data-cy=btn]').eq(1).click();
        cy.contains('Tambah Data Asesi').should('not.be.exist');
        
        cy.get('[data-cy=btn]').contains('Draft').parent().should('have.attr', 'disabled', 'disabled');
        cy.get('[data-cy=btn]').contains('Publikasi').parent().should('have.attr', 'disabled', 'disabled');
        cy.clearCookies()
        cy.contains('Form isian belum diisi dengan benar.').should('be.visible');        
    })

    it('Create assessment without select the start_date assessment', () => {
        cy.get('.vs-inputx', {timeout:10000}).first().type('tes');
        cy.get('.vdp-datepicker input').last().should('have.attr', 'disabled', 'disabled');
    })

    it('Create assessment without select the end_date assessment', () => {
        cy.get('.vs-inputx').first().type('tes');
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();
        cy.get(':nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)').type('Messi');
        cy.wait(1000);
        cy.contains('Messi').first().parent().click();
        cy.get(':nth-child(2) > .content > .vs-collapse > :nth-child(1) > .vs-collapse-item--header > div').click();

        cy.contains('Bobot Asesor').scrollIntoView().click();
        cy.get('.open-item .vs-inputx').eq(0).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(1).clear().type('100');
        cy.get('.open-item .vs-inputx').eq(2).clear().type('0');
        cy.get('.open-item .vs-inputx').eq(3).clear().type('0');
        cy.get('[data-cy=btn]').eq(1).click();
        cy.contains('Tambah Data Asesi').should('not.be.exist');

        cy.get('[data-cy=btn]').contains('Draft').parent().should('have.attr', 'disabled', 'disabled');
        cy.get('[data-cy=btn]').contains('Publikasi').parent().should('have.attr', 'disabled', 'disabled');
        cy.contains('Form isian belum diisi dengan benar.').should('be.visible');
    })

    it('Uncheck toggle daftar jabatan', () => {
        cy.get('.vs-inputx', {timeout:10000}).first().type('tes');

        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('.check').click();
        cy.get('.vue-recycle-scroller__item-wrapper').should('have.attr', 'style', 'min-height: 0px;');
    })

    it('Input or Search daftar jabatan that doesnt exist', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get(':nth-child(1) > .col-select > .search > .vs-component > .vs-con-input > .vs-inputx').type('Depart');
        cy.get('.halo-tree').should('have.length', 1)
    })

    it('Input or Search daftar pegawai that doesnt exist', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('.vs-inputx').last().type('CR 7');
        cy.get('.vue-recycle-scroller__item-wrapper').should('have.attr', 'style', 'min-height: 0px;');
    })

    it('Click button Tambah on Daftar Pegawai list section', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('[type=checkbox]').parent().first().click();
        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible')
        cy.get('[data-cy=btn]').last().should('have.attr', 'disabled', 'disabled');
        cy.contains('Batal').should('be.visible');
    })

    it('Click button Batal on Tambah Data Asesi', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('[type=checkbox]').parent().first().click();
        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.contains('Batal').click();

        cy.get('.vs-dialog-accept-button').should('be.visible');
        cy.get('.vs-dialog-cancel-button').should('be.visible');
    });

    it('Click button Ya on Pop up Confirmation Batal on Tambah Data Asesi', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('[type=checkbox]').parent().first().click();
        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.contains('Batal').click();
        cy.get('.vs-dialog-accept-button').should('be.visible');
        cy.contains('Tambah Data Asesi').should('not.be.visible');
    });

    it('Click button Tidak on Pop up Confirmation Batal on Tambah Data Asesi', () => {
        cy.get('.vs-inputx').first().type('tes');
        
        // tanggal dimulai
        cy.get('.vdp-datepicker').first().click();  
        cy.get('[style=""] > div > :nth-child(19)').click().should('not.be.visible');

        // tanggal berakhir
        cy.get('.vdp-datepicker').last().click();
        cy.get('[style=""] > div > :nth-child(20)').click().should('not.be.visible');

        cy.get('[type=checkbox]').parent().first().click();
        cy.get('.vs-inputx').last().type('ronaldo');
        cy.get('#btn-add-7932').click();

        cy.contains('Tambah Data Asesi').should('be.visible');
        cy.contains('Batal').click();
        cy.get('.vs-dialog-cancel-button').click();
        cy.contains('Tambah Data Asesi').should('be.visible');
    })
})