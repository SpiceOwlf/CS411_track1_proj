import scrapy
from urllib.parse import urlencode
from urllib.parse import urljoin
import re
import json
#code source check: https://dev.to/iankerins/how-to-scrape-amazon-at-scale-with-python-scrapy-and-never-get-banned-44cm
#to run: scrapy crawl amazon -o test_scrapingbee.csv

# queries = ['tshirt for men', 'tshirt for women']
queries = ['RTX 1060','RTX 1060 ti','RTX 1070', 'RTX 1070 ti','RTX 1080','RTX 1080 ti','RTX 2060','RTX 2060 ti','RTX 2070','RTX 2070 ti','RTX 2080','RTX 2080 ti','RTX 3060','RTX 3070','RTX 3080']
API = '5MN8R97C62WSLF0LOD1BZM14WNIRPD3D8PX6C6HYKDC6HE0ORDBC67OD1BS1P4LWYM6UDH0IGDTM86DJ'

#scrapingBee:
# https://app.scrapingbee.com/api/v1/?
# api_key=9816F0C8MIWIJD0D02WB09CZZ6HOGW2CWQTP3U9FOT4T22T2J0L3I6TSOKYVJIOVWPQS6PHWV5BOL9OB&
# url=YOUR-URL



def get_url(url):
    payload = {'api_key': API, 'url': url, 'country_code': 'us'}
    proxy_url = 'https://app.scrapingbee.com/api/v1/?' + urlencode(payload)
    # print(proxy_url is, "proxy_url")
    return proxy_url


class AmazonSpider(scrapy.Spider):
    name = 'amazon'
    # allowed_domains = ['amazon.com']
    # start_urls = ['http://amazon.com/']

    def parse(self, response):
        start_requests(self)


    def start_requests(self):
        for query in queries:
            url = 'https://www.amazon.com/s?' + urlencode({'k': query})
            yield scrapy.Request(url=get_url(url), callback=self.parse_keyword_response)
    


    def parse_keyword_response(self, response):
            products = response.xpath('//*[@data-asin]')

            for product in products:
                asin = product.xpath('@data-asin').extract_first()
                product_url = f"https://www.amazon.com/dp/{asin}"
                yield scrapy.Request(url=get_url(product_url), callback=self.parse_product_page, meta={'asin': asin})

            next_page = response.xpath('//li[@class="a-last"]/a/@href').extract_first()
            if next_page:
                url = urljoin("https://www.amazon.com",next_page)
                yield scrapy.Request(url=get_url(product_url), callback=self.parse_keyword_response)



    def parse_product_page(self, response):
            asin = response.meta['asin']
            title = response.xpath('//*[@id="productTitle"]/text()').extract_first()
            image = re.search('"large":"(.*?)"',response.text).groups()[0]
            rating = response.xpath('//*[@id="acrPopover"]/@title').extract_first()
            number_of_reviews = response.xpath('//*[@id="acrCustomerReviewText"]/text()').extract_first()
            price = response.xpath('//*[@id="priceblock_ourprice"]/text()').extract_first()

            if not price:
                price = response.xpath('//*[@data-asin-price]/@data-asin-price').extract_first() or \
                        response.xpath('//*[@id="price_inside_buybox"]/text()').extract_first()

            temp = response.xpath('//*[@id="twister"]')
            sizes = []
            colors = []
            if temp:
                s = re.search('"variationValues" : ({.*})', response.text).groups()[0]
                json_acceptable = s.replace("'", "\"")
                di = json.loads(json_acceptable)
                sizes = di.get('size_name', [])
                colors = di.get('color_name', [])

            bullet_points = response.xpath('//*[@id="feature-bullets"]//li/span/text()').extract()
            seller_rank = response.xpath('//*[text()="Amazon Best Sellers Rank:"]/parent::*//text()[not(parent::style)]').extract()
            yield {'asin': asin, 'Title': title, 'MainImage': image, 'Rating': rating, 'NumberOfReviews': number_of_reviews,
                'Price': price, 'AvailableSizes': sizes, 'AvailableColors': colors, 'BulletPoints': bullet_points,
                'SellerRank': seller_rank}


        
