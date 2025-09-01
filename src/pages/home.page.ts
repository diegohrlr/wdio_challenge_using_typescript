/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { EditItemParams } from '../types/homePage.types'
import items from '../utils/apis/items';
import wdioAssertions from '../utils/assertions/wdio_assertions';
import wdioWaits from '../utils/assertions/wdio_waits';
import BasePage from './basepage';
const path = require("path")

class HomePage extends BasePage {
    protected get pagePath() { return '/' }

    constructor() {
        super()
    }

    private get title() { return $('h1') }
    private get itemsList() { return $$('ul.ui-sortable > li') }
    private getItemByTitle(title: string) { return $(`//li[contains(.,'${title}')]`) }
    private get itemsTitleLocator() { return 'p' }
    private get imgLocator() { return 'img' }
    private get editLocator() { return '.btn-group > button:nth-child(1)' }
    private get deleteLocator() { return '.btn-group > button:nth-child(2)' }

    // Item Details
    private get detailsImg() { return $('#inputImage') }
    private get detailsTitle() { return $('.details > h3') }
    private get detailsTextarea() { return $('textarea') }
    private get detailsSubmitBtn() { return $('button.btn-success') }
    private get detailsUpdateItemBtn() { return $('button.btn-primary') }

    // Delete modal
    private get confirmDeleteBtn() { return $('.modal-dialog button.btn-primary') }
    private get cancelDeleteBtn() { return $('.modal-dialog button.btn-warning') }


    private get pageContentFromApi() { return items.getItems() }
    private get pageContent() {
        return {
            title: 'List of items (${count})',
            editCopy: 'Edit',
            deleteCopy: 'Delete',
            imgPath: 'assets/images/'
        }
    }

    async pageIsDisplayed() {
        await this.title.waitForDisplayed()
        await this.detailsTitle.waitForDisplayed()
    }

    /**
     * Will verify each item list content
     */
    async verifyListOfItems() {
        const itemsFromApi = await this.pageContentFromApi

        // Verificar title
        await wdioAssertions.toHaveText(this.title, this.pageContent.title.replace('${count}', itemsFromApi.length))

        for await (const [index, elem] of (await this.itemsList).entries()) {
            await wdioAssertions.toHaveAttribute(await elem.$(this.imgLocator), 'src', this.pageContent.imgPath + itemsFromApi[index].imageSrc)
            await wdioAssertions.toEqual(await elem.$(this.itemsTitleLocator).getText(), itemsFromApi[index].text)
            await wdioAssertions.toEqual(await elem.$(this.editLocator).getText(), this.pageContent.editCopy)
            await wdioAssertions.toEqual(await elem.$(this.deleteLocator).getText(), this.pageContent.deleteCopy)
        }
    }

    /**
     * Will fill form details and check if CTA is enabled or not
     * @param param0 
     */
    async verifyFormValidation({ title, filePathToUpload, isCTAClickable = true }: { title?: string, filePathToUpload?: string, isCTAClickable: boolean }) {
        await this.fillDetailsForm({ title, filePathToUpload })
        if (isCTAClickable) {
            await wdioAssertions.toEqual(await this.detailsSubmitBtn.isClickable(), true)
        } else {
            await wdioAssertions.toEqual(await this.detailsSubmitBtn.isClickable(), false)
        }
    }

    async createItem({ title, filePathToUpload }) {
        await this.fillDetailsForm({ title, filePathToUpload })
        await this.detailsSubmitBtn.click()
        await this.pageIsDisplayed()
    }

    async editItem({ currentTitle, newTitle, newFilePath }: EditItemParams) {
        await this.pageIsDisplayed()
        await this.searchAndEditItemByTitle(currentTitle)
        await this.fillDetailsForm({ title: newTitle, filePathToUpload: newFilePath })
        await this.detailsUpdateItemBtn.click()
        await this.pageIsDisplayed()
    }

    async deleteItem(currentTitle: string, confirmDelete: boolean = true) {
        await this.pageIsDisplayed()
        await this.searchAndDeleteItemByTitle(currentTitle, confirmDelete)
        await this.detailsUpdateItemBtn.click()
        await this.pageIsDisplayed()
    }

    async goToEditFormFromIndex(index: number) {
        await this.pageIsDisplayed
        const item = this.itemsList[index]
        const itemText = await item.$(this.itemsTitleLocator).getText()
        await item.waitForDisplayed()
        await item.$(this.editLocator).click()
        await wdioWaits.toHaveValue(this.detailsTextarea, itemText)
    }

    private async searchAndEditItemByTitle(title: string) {
        const item = this.getItemByTitle(title)
        await item.waitForDisplayed()
        await item.$(this.editLocator).click()
    }

    private async searchAndDeleteItemByTitle(title: string, acceptAlert = true) {
        const item = this.getItemByTitle(title)
        await item.waitForDisplayed()
        await item.$(this.deleteLocator).click()
        await this.confirmDeleteBtn.waitForDisplayed()
        acceptAlert ? await this.confirmDeleteBtn.click() : await this.cancelDeleteBtn.click()
    }

    /**
     * Helper method to fill details form
     * @param param0 Object with title and filePath. Expected params:
     * - title: string to set in textarea
     * - filePathToUpload: path to the file to upload
     */
    private async fillDetailsForm({ title, filePathToUpload }) {
        await this.pageIsDisplayed()
        if (title) {
            await this.detailsTextarea.clearValue()
            await this.detailsTextarea.setValue(title)
        }
        if (filePathToUpload) {
            const absolutePath = path.resolve(process.cwd(), filePathToUpload)
            const remoteFilePath = await browser.uploadFile(absolutePath)
            await this.detailsImg.setValue(remoteFilePath)
        }
    }

    /**
     * Will verify if item exists. 
     * @param param0 Object with title and optional fileName to verify image src too
     */
    async verifyItemExists({ title, fileName }: { title: string, fileName?: string }) {
        await this.pageIsDisplayed()
        const createdItem = await this.getItemByTitle(title)
        await createdItem.waitForDisplayed()
        await wdioAssertions.toEqual(await createdItem.$(this.itemsTitleLocator).getText(), title)
        if (fileName) {
            await wdioAssertions.toHaveAttribute(await createdItem.$(this.imgLocator), 'src', this.pageContent.imgPath + fileName)
        }
    }

    async verifyItemNotExists(title: string) {
        await this.pageIsDisplayed()
        await wdioAssertions.toEqual(await this.getItemByTitle(title).isExisting(), false)
    }
}

export default HomePage;