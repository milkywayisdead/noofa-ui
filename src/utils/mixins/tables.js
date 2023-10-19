const tableExportMixin = {
    computed: {
        exportBtnsSelectors(){
            return {
                csv: `#${this.id}-container button.buttons-csv.buttons-html5`,
                excel: `#${this.id}-container button.buttons-excel.buttons-html5`,
                copy: `#${this.id}-container button.buttons-copy.buttons-html5`,
            }
        }
    },
    methods: {
        download(format){
            try {
                document.querySelector(
                    this.exportBtnsSelectors[format]
                ).click()
            } catch {}
        },
        _hideExportBtns(){
            const csvBtn = document.querySelector(
                this.exportBtnsSelectors.csv
            )
            const excelBtn = document.querySelector(
                this.exportBtnsSelectors.excel
            )
            const copyBtn = document.querySelector(
                this.exportBtnsSelectors.copy
            )

            for(let b of [csvBtn, excelBtn, copyBtn]){
                b.style.display = 'none'
            }
        },
    },
}

export {
    tableExportMixin,
}