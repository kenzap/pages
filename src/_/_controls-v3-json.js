{
  "data": {
    "title": "Gallery",
    "description": "A gallery layout to list your photos of portfolio of works",
    "preview": true,
    "slug": "gallery",
    "csslibs": "",
    "jslibs": "",
    "controls": [
        {
            "key": "header",
            "input": "richtext",
            "title": "Header",
            "value": "",
            "hint": "Header title or description."
        },
        {
            "key": "style", 
            "input": "radio",
            "title": "Gallery style",
            "options": [
                {
                    "key": "kp-square",
                    "value": "Square"
                },
                {
                    "key": "kp-vertical",
                    "value": "Portrait"
                },
                {
                    "key": "kp-horizontal",
                    "value": "Landscape"
                }
            ],
            "value": "kp-horizontal",
            "default": "",
            "hint": "Gallery image style."
        },
        {
            "key": "filters",
            "input": "textarea",
            "title": "Global filters",
            "value": "All\nPopular\nDesign\nCreative\nInteractive",
            "default": "art",
            "rows": "5",
            "hint": "Specify gallery filters to sort images interactively. One filter per line. Leave blank to hide."
        },
        {
            "key": "effect",
            "input": "radio",
            "title": "Hover effect",
            "options": [
                {
                    "key": "",
                    "value": "No offect"
                },
                {
                    "key": "kp-zoom-in",
                    "value": "Zoom in"
                },
                {
                    "key": "kp-zoom-out",
                    "value": "Zoom out"
                },
                {
                    "key": "kp-frame-in",
                    "value": "Frame in"
                },
                {
                    "key": "kp-frame-out",
                    "value": "Frame out"
                }
            ],
            "value": "kp-frame-in",
            "default": "",
            "hint": "Image mouse hover effect.",
            "id": "MTjtQFFjxjWph"
        },
        {
            "type": "list",
            "key":"images",
            "list": [
                {
                    "key": "img",
                    "input": "image",
                    "title": "Image",
                    "value": "https://static.kenzap.com/layouts/image.jpg",
                    "default": "",
                    "sizes": [
                        "300x300",
                        "1400"
                    ],
                    "hint": "Recommended image size is 1400px wide."
                },
                {
                    "key": "text",
                    "input": "text",
                    "title": "Text",
                    "value": "Wonderful Times",
                    "default": "Designing Dreams",
                    "hint": "Text located below image."
                },
                {
                    "key": "filters",
                    "input": "textarea",
                    "title": "Filters",
                    "value": "All\nCreative\n",
                    "default": "art",
                    "rows": "6",
                    "hint": "Specify gallery filters to sort images interactively. Pick from global filters.",
                    "id": "oVcUyQwGgvcz"
                }
            ]
        },
        {
            "type": "list",
            "key":"images",
            "list": [
                {
                    "key": "img",
                    "input": "image",
                    "title": "Image",
                    "value": "https://static.kenzap.com/layouts/image.jpg",
                    "default": "",
                    "sizes": [
                        "300x300",
                        "1400"
                        ],
                    "hint": "Recommended image size is 1400px wide"
                },
                {
                    "key": "text",
                    "input": "text",
                    "title": "Text",
                    "value": "Wonderful Times",
                    "default": "Designing Dreams",
                    "hint": "Text located below image."
                },
                {
                    "key": "filters",
                    "input": "textarea",
                    "title": "Filters",
                    "value": "All\nCreative\n",
                     "default": "art",
                    "rows": "6",
                    "hint": "Specify gallery filters to sort images interactively. Pick from global filters."
                }
            ]
        },
        {
            "type": "list",
            "key":"images",
            "list": [
            {
                "key": "img",
                "input": "image",
                "title": "Image",
                "value": "https://static.kenzap.com/layouts/image.jpg",
                "default": "",
                "sizes": [
                    "300x300",
                    "1400"
                ],
                "hint": "Recommended image size is 1400px wide"
            },
            {
                "key": "text",
                "input": "text",
                "title": "Text",
                "value": "Wonderful Times",
                "default": "Designing Dreams",
                "hint": "Text located below image.",
                "id": "BYfJhoMBINFyS"
            },
            {
                "key": "filters",
                "input": "textarea",
                "title": "Filters",
                "value": "All\nCreative\nPopular\nDesign\n",
                "default": "art",
                "rows": "6",
                "hint": "Specify gallery filters to sort images interactively. Pick from global filters.",
                "id": "oVcUyQwGgfvcz"
            }
            ]
        },
        {
            "key": "img",
            "input": "image",
            "title": "Image",
            "value": "https://static.kenzap.com/layouts/image.jpg",
            "default": "",
            "sizes": [
                "300x300",
                "1400"
            ],
            "hint": "Recommended image size is 1400px wide"
        },
        {
            "key": "text",
            "input": "text",
            "title": "Text",
            "value": "Wonderful Times",
            "default": "Designing Dreams",
            "hint": "Text located below image.",
            "id": "BYJhoMfBINFyS"
        },
        {
            "key": "filters",
            "input": "textarea",
            "title": "Filters",
            "value": "All\nCreative\nInteractive",
            "default": "art",
            "rows": "6",
            "hint": "Specify gallery filters to sort images interactively. Pick from global filters.",
            "id": "oVcUfy4QwGgvcz"
        }
    ],
    "template": "universal",
    "keywords": "Gallery",
    "c": {
      "section": "background-color:#f9f9f9;",
      "container": "max-width:1168px;padding-left:16px;padding-right:16px;",
      "classes": "pdm "
    }
  }
}