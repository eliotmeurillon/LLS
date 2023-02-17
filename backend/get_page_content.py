import asyncio
import nest_asyncio
from requests_html import AsyncHTMLSession
import pyppeteer

nest_asyncio.apply()


async def get_page_content():
    session = AsyncHTMLSession()
    r = await session.get("https://www.vie-publique.fr/lois-feeds.xml")
    await asyncio.sleep(1)
    await r.html.arender()
    return r.html.html


async def main():
    browser = await pyppeteer.launch(ignoreHTTPSErrors=True, headless=True)
    page = await browser.newPage()
    content = await get_page_content()
    await page.setContent(content)
    html = await page.content()
    print(html)
    await browser.close()

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
