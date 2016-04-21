var fs = require('fs');
var https = require('https');


function download(name, url) {
	console.log('downloading', name + '.woff2', url)

	var file = fs.createWriteStream(name + '.woff2');
	var request = https.get(url, function(response) {
		response.pipe(file);
	});
}

download('Roboto-Thin-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/ty9dfvLAziwdqQ2dHoyjphTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/frNV30OaYdlFRtH2VnZZdhTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/gwVJDERN2Amz39wrSoZ7FxTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-greek', 'https://fonts.gstatic.com/s/roboto/v15/aZMswpodYeVhtRvuABJWvBTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/VvXUGKZXbHtX_S_VCTLpGhTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/e7MeVAyvogMqFwwl61PKhBTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Thin-latin', 'https://fonts.gstatic.com/s/roboto/v15/2tsd397wLxj96qwHyNIkxPesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Light-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/0eC6fl06luXEYWpBSJvXCBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/Fl4y0QdOxyyTHEGMXX8kcRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/-L14Jk06m6pUHB-5mXQQnRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-greek', 'https://fonts.gstatic.com/s/roboto/v15/I3S1wsgSg9YCurV6PUkTORJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/NYDWBdD4gIq26G5XYbHsFBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/Pru33qjShpZSmG3z6VYwnRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Light-latin', 'https://fonts.gstatic.com/s/roboto/v15/Hgo13k-tfSpn0qi1SFdUfVtXRa8TVwTICgirnJhmVJw.woff2');
download('Roboto-Regular-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/ek4gzZ-GeXAPcSbHtCeQI_esZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/mErvLBYg_cXG3rLvUsKT_fesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/-2n2p-_Y08sg57CNWQfKNvesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-greek', 'https://fonts.gstatic.com/s/roboto/v15/u0TOpm082MNkS5K0Q4rhqvesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/NdF9MtnOpLzo-noMoG0miPesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/Fcx7Wwv8OzT71A3E1XOAjvesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-Regular-latin', 'https://fonts.gstatic.com/s/roboto/v15/CWB0XYA8bzo0kSThX0UTuA.woff2');
download('Roboto-Medium-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/ZLqKeelYbATG60EpZBSDyxJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/oHi30kwQWvpCWqAhzHcCSBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/rGvHdJnr2l75qb0YND9NyBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-greek', 'https://fonts.gstatic.com/s/roboto/v15/mx9Uck6uB63VIKFYnEMXrRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/mbmhprMH69Zi6eEPBYVFhRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/oOeFwZNlrTefzLYmlVV1UBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Medium-latin', 'https://fonts.gstatic.com/s/roboto/v15/RxZJdnzeo3R5zSexge8UUVtXRa8TVwTICgirnJhmVJw.woff2');
download('Roboto-Bold-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/77FXFjRbGzN4aCrSFhlh3hJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/isZ-wbCXNKAbnjo6_TwHThJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/UX6i4JxQDm3fVTc1CPuwqhJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-greek', 'https://fonts.gstatic.com/s/roboto/v15/jSN2CGVDbcVyCnfJfjSdfBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/PwZc-YbIL414wB9rB1IAPRJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/97uahxiqZRoncBaCEI3aWxJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Bold-latin', 'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOFtXRa8TVwTICgirnJhmVJw.woff2');
download('Roboto-Black-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/s7gftie1JANC-QmDJvMWZhJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/3Y_xCyt7TNunMGg0Et2pnhJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/WeQRRE07FDkIrr29oHQgHBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-greek', 'https://fonts.gstatic.com/s/roboto/v15/jyIYROCkJM3gZ4KV00YXOBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/phsu-QZXz1JBv0PbFoPmEBJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/9_7S_tWeGDh5Pq3u05RVkhJtnKITppOI_IvcXXDNrsc.woff2');
download('Roboto-Black-latin', 'https://fonts.gstatic.com/s/roboto/v15/mnpfi9pxYH-Go5UiibESIltXRa8TVwTICgirnJhmVJw.woff2');
download('Roboto-ThinItalic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/1DbO0RvWEevroPvEzA5briEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/5z9jpDJQqVE5bmkRqplJfiEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/cueeGLWq_s1uoQgOf76TFiEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-greek', 'https://fonts.gstatic.com/s/roboto/v15/yTs8gw1HdasCzJ-B_iUwzSEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/gLfmBATgABwy0zMVv-qqhiEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/dzxs_VxZUhdM2mEBkNa8siEAvth_LlrfE80CYdSH47w.woff2');
download('Roboto-ThinItalic-latin', 'https://fonts.gstatic.com/s/roboto/v15/12mE4jfMSBTmg-81EiS-Yfk_vArhqVIZ0nv9q090hN8.woff2');
download('Roboto-LightItalic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0atzTOQ_MqJVwkKsUn0wKzc2I.woff2');
download('Roboto-LightItalic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0atzUj_cnvWIuuBMVgbX098Mw.woff2');
download('Roboto-LightItalic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0at0bcKLIaa1LC45dFaAfauRA.woff2');
download('Roboto-LightItalic-greek', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0at2o_sUJ8uO4YLWRInS22T3Y.woff2');
download('Roboto-LightItalic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0at76up8jxqWt8HVA3mDhkV_0.woff2');
download('Roboto-LightItalic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0atyYE0-AqJ3nfInTTiDXDjU4.woff2');
download('Roboto-LightItalic-latin', 'https://fonts.gstatic.com/s/roboto/v15/7m8l7TlFO-S3VkhHuR0at44P5ICox8Kq3LLUNMylGO4.woff2');
download('Roboto-Italic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/WxrXJa0C3KdtC7lMafG4dRTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/OpXUqTo0UgQQhGj_SFdLWBTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/1hZf02POANh32k2VkgEoUBTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-greek', 'https://fonts.gstatic.com/s/roboto/v15/cDKhRaXnQTOVbaoxwdOr9xTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/K23cxWVTrIFD6DJsEVi07RTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/vSzulfKSK0LLjjfeaxcREhTbgVql8nDJpwnrE27mub0.woff2');
download('Roboto-Italic-latin', 'https://fonts.gstatic.com/s/roboto/v15/vPcynSL0qHq_6dX7lKVByfesZW2xOQ-xsNqO47m55DA.woff2');
download('Roboto-MediumItalic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0TTOQ_MqJVwkKsUn0wKzc2I.woff2');
download('Roboto-MediumItalic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0TUj_cnvWIuuBMVgbX098Mw.woff2');
download('Roboto-MediumItalic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0UbcKLIaa1LC45dFaAfauRA.woff2');
download('Roboto-MediumItalic-greek', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0Wo_sUJ8uO4YLWRInS22T3Y.woff2');
download('Roboto-MediumItalic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0b6up8jxqWt8HVA3mDhkV_0.woff2');
download('Roboto-MediumItalic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0SYE0-AqJ3nfInTTiDXDjU4.woff2');
download('Roboto-MediumItalic-latin', 'https://fonts.gstatic.com/s/roboto/v15/OLffGBTaF0XFOW1gnuHF0Y4P5ICox8Kq3LLUNMylGO4.woff2');
download('Roboto-BoldItalic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcCzTOQ_MqJVwkKsUn0wKzc2I.woff2');
download('Roboto-BoldItalic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcCzUj_cnvWIuuBMVgbX098Mw.woff2');
download('Roboto-BoldItalic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcC0bcKLIaa1LC45dFaAfauRA.woff2');
download('Roboto-BoldItalic-greek', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcC2o_sUJ8uO4YLWRInS22T3Y.woff2');
download('Roboto-BoldItalic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcC76up8jxqWt8HVA3mDhkV_0.woff2');
download('Roboto-BoldItalic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcCyYE0-AqJ3nfInTTiDXDjU4.woff2');
download('Roboto-BoldItalic-latin', 'https://fonts.gstatic.com/s/roboto/v15/t6Nd4cfPRhZP44Q5QAjcC44P5ICox8Kq3LLUNMylGO4.woff2');
download('Roboto-BlackItalic-cyrillic-ext', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpTTOQ_MqJVwkKsUn0wKzc2I.woff2');
download('Roboto-BlackItalic-cyrillic', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpTUj_cnvWIuuBMVgbX098Mw.woff2');
download('Roboto-BlackItalic-greek-ext', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpUbcKLIaa1LC45dFaAfauRA.woff2');
download('Roboto-BlackItalic-greek', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpWo_sUJ8uO4YLWRInS22T3Y.woff2');
download('Roboto-BlackItalic-vietnamese', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpb6up8jxqWt8HVA3mDhkV_0.woff2');
download('Roboto-BlackItalic-latin-ext', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpSYE0-AqJ3nfInTTiDXDjU4.woff2');
download('Roboto-BlackItalic-latin', 'https://fonts.gstatic.com/s/roboto/v15/bmC0pGMXrhphrZJmniIZpY4P5ICox8Kq3LLUNMylGO4.woff2');