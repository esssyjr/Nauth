import requests

class OpenSeaService:
    def __init__(self, api_key: str):
        self.base_url = "https://api.opensea.io/api/v2"
        self.headers = {
            "accept": "application/json",
            "x-api-key": api_key
        }

    def get_nft_images_from_collection(self, collection_slug: str, limit: int = 100):
        url = f"{self.base_url}/collection/{collection_slug}/nfts"
        params = {"limit": min(limit, 50)}
        
        image_urls = []
        while len(image_urls) < limit:
            response = requests.get(url, headers=self.headers, params=params)
            data = response.json()
            
            for nft in data.get('nfts', []):
                if nft.get('image_url'):
                    image_urls.append(nft['image_url'])
                    if len(image_urls) >= limit:
                        break
            
            if 'next' not in data or not data['nfts']:
                break
            params['next'] = data['next']

        return image_urls[:limit]