report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/yd_qqmap_0_document_0_phone.png",
        "test": "../bitmaps_test/20181109-185100/yd_qqmap_0_document_0_phone.png",
        "selector": "document",
        "fileName": "yd_qqmap_0_document_0_phone.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "3.22",
          "analysisTime": 34
        },
        "diffImage": "../bitmaps_test/20181109-185100/failed_diff_yd_qqmap_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/yd_qqmap_0_document_1_tablet.png",
        "test": "../bitmaps_test/20181109-185100/yd_qqmap_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "yd_qqmap_0_document_1_tablet.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found /Users/pecoo/Desktop/ydtest/backstop_data/bitmaps_reference/yd_qqmap_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "yd"
});