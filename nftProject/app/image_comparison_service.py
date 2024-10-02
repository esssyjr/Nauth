import cv2
import numpy as np
from PIL import Image
import io
import requests

class ImageComparisonService:
    def __init__(self, similarity_threshold=0.8):
        self.similarity_threshold = similarity_threshold
        self.preprocessed_images = []

    def preprocess_images(self, image_urls):
        for url in image_urls:
            response = requests.get(url)
            img = Image.open(io.BytesIO(response.content)).convert('RGB')
            img_array = np.array(img)
            self.preprocessed_images.append(self._compute_features(img_array))

    def compare_image(self, image_bytes):
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img_array = np.array(img)
        features = self._compute_features(img_array)

        for preprocessed_features in self.preprocessed_images:
            similarity = self._compute_similarity(features, preprocessed_features)
            if similarity > self.similarity_threshold:
                return True, similarity

        return False, 0.0

    def _compute_features(self, img):
        # Simple feature extraction using color histogram
        return cv2.calcHist([img], [0, 1, 2], None, [8, 8, 8], [0, 256, 0, 256, 0, 256])

    def _compute_similarity(self, hist1, hist2):
        return cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)