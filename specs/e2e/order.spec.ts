import { test, expect } from './baseFixtures'
import path from 'path'
import './config/dotenv-config'
import { waitForResponse } from './utils/response'
const endpointURL = `${process.env.__ENDPOINT__}/order`

test('Order', async ({ page, browser }) => {
  await page.coverage.startJSCoverage()
  await page.goto(endpointURL)
  await Promise.all([
    page.waitForResponse(waitForResponse('/api/prices')),
    page.waitForResponse(waitForResponse('/api/skus')),
  ])
  const priceItem = await await page.textContent('[data-test=price]')
  const comparePriceItem = await page.textContent(
    ':right-of(:nth-match([data-test=price], 1))'
  )
  expect(priceItem).toBe('€29,00')
  expect(comparePriceItem).toBe('€37,70')
  // const filterdPrice = await page.textContent('data-test=price-filter-0')
  // const compareFilteredPrice = await page.textContent(
  //   ':right-of(:nth-match([data-test="price-filter-0"], 1))'
  // )
  // const price = await page.textContent('data-test=price-0')
  // const comparePrice = await page.textContent(
  //   ':right-of(:nth-match([data-test="price-0"], 1))'
  // )
  // const dollarPrice = await page.textContent(
  //   ':nth-match([data-test="price-0"], 3)'
  // )
  // const compareDollarPrice = await page.textContent(
  //   ':nth-match([data-test="price-0"], 4)'
  // )
  // expect(filterdPrice).toBe('€29,00')
  // expect(filterdPrice).not.toBe('$29,00')
  // expect(compareFilteredPrice).toBe('€37,70')
  // expect(price).toBe('€29,00')
  // expect(comparePrice).toBe('€37,70')
  // expect(dollarPrice).toBe('$34.80')
  // expect(compareDollarPrice).toBe('$45.24')
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'prices.jpg'),
  })
  await page.coverage.stopJSCoverage()
  await browser.close()
})