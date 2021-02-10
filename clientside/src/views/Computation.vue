<template>
    <v-container fluid pa-0>
        <v-toolbar flat>
            <v-toolbar-title>Example HRD Computation System</v-toolbar-title>
        </v-toolbar>
        <v-row>
            <v-col cols="5">
                <v-text-field v-model="ConstructionCode" dense outlined rounded label="Construction Code"></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field v-model="PlanNo" dense outlined rounded label="Plan Number"></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-btn @click="onLoadData()" rounded outlined color="green">
                    Generate <v-icon>mdi-database-search</v-icon>
                </v-btn>
                <v-btn @click="dataView = true" rounded outlined color="blue">
                    View <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <div v-if="isLoading" class="text-center">
            <v-progress-circular
            indeterminate
            color="green"
            ></v-progress-circular>
        </div>
        <template v-else>
            <v-data-table :items="estimationData" :headers="estimationHeader">
            </v-data-table>
        </template>
        <v-alert v-if="isError" type="error">
            {{errorMessage}}
        </v-alert>
        <v-dialog v-model="dataView" width="700">
            <v-card>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <h2>{{toSave.ConstructionCode}}-{{toSave.PlanNo}}</h2>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled
                            v-model="toSave.HouseType" 
                            label="House Type">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Storey" 
                            label="Floor Number">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Kanabakari" 
                            label="Kanabakari">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Menshin" 
                            label="Menshin">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.BuildingArea" 
                            label="Building Area">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.ConstructionArea" 
                            label="Construction Area">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.TotalFloorArea" 
                            label="Total Floor Area">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Floor1stArea" 
                            label="1st Floor Area">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Floor2ndArea" 
                            label="2nd Floor Area">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            disabled 
                            v-model="toSave.Floor3rdArea" 
                            label="3rd Floor Area">
                            </v-text-field>
                        </v-col>


                        
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field 
                            :disabled="!isAllow" 
                            v-model="toSave.Yane" 
                            label="Yane">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            :disabled="!isAllow" 
                            v-model="toSave.Siding" 
                            label="Siding">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            v-model="toSave.SpecialYane" 
                            label="Special Yane">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field 
                            v-model="toSave.SpecialSiding" 
                            label="Special Siding">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn @click="onCancel()">cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="onSave()">save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            dataView: false,
            ConstructionCode: "",
            PlanNo: "",
            constructionArea: [],
            basicInformation: [],
            isLoading: false,
            toSave: {},
            errorMessage: "",
            isError: false,
            leaders: [
                "Technical Specialist",
                "Team In-Charge",
                "Team Head",
                "Team Head Trainee",
                "Section In-Charge",
                "Section Head",
                "Section Head Trainee",
                "Department In-Charge",
                "Department Head",
                "Department Head Trainee"
                ],
            estimationData: [],
            estimationHeader: [
                {text: "Construction Code", value: "ConstructionCode"},
                {text: "Plan No", value: "PlanNo"},
                {text: "House Type", value: "HouseType"},
                {text: "Yane", value: "Yane"},
                {text: "Siding", value: "Siding"}
            ]
        }
    },
    mounted(){
        this.onLoadEstimations()
    },
    computed: {
        isAllow(){
            return this.leaders.includes(this.userInfo.designation) 
            || this.userInfo.employeeCode === '19178'
        }
    },
    methods: {
        onLoadEstimations(){
            axios.get(`${this.baseUrl}estimations`).then(res => {
                this.estimationData = res.data
            })
        },
        onCancel(){
            this.dataView = false
            this.toSave.SpecialSiding = ""
            this.toSave.SpecialYane = ""
        },
        onSave(){
            axios.post(`${this.baseUrl}estimation`, this.toSave)
                .then(() => {
                    // array.push(element)
                    this.estimationData.push(this.toSave)
                    // this.onLoadEstimations()
                    alert('successfully saved!')
                    this.dataView = false
                    this.toSave = {}
                })
        },
        onLoadData(){
            this.isLoading = true
        // load constructionArea

        axios.get(`${this.icadApiUrl}?ConstructionCode=${this.ConstructionCode}&PlanNo=${this.PlanNo}&db=PlanConstructionAreas`)
            .then(res2 => {
                this.constructionArea = res2.data
                // load basicInformation
                axios.get(`${this.icadApiUrl}/basicSpecifications?ConstructionCode=${this.ConstructionCode}&PlanNo=${this.PlanNo}`)
                    .then(res => {
                        if(res.data.errno){
                            this.isError = true
                            this.errorMessage = res.data.message
                            setTimeout(() => {
                                this.isError = false
                            }, 3000)
                            this.toSave = {}
                            this.isLoading = false
                        }else{
                            this.basicInformation = res.data.filter(rec => {
                            return rec != null
                        })
                        this.toSave.ConstructionCode = this.ConstructionCode //1
                        this.toSave.PlanNo = this.PlanNo //2
                        this.toSave.HouseType = this.basicInformation.filter(rec => {
                            return rec.EnglishName === "House type"
                        })[0].EnglishValue

                        this.toSave.Storey = this.basicInformation.filter(rec => {
                            return rec.EnglishName === "Storey"
                        })[0].EnglishValue

                        this.toSave.Kanabakari = this.basicInformation.filter(rec => {
                            return rec.EnglishName === "Kanabakari"
                        })[0].EnglishValue

                        this.toSave.Menshin = this.basicInformation.filter(rec => {
                            return rec.EnglishName === "Menshin"
                        })[0].JapaneseValue

                        this.toSave.BuildingArea = this.constructionArea[0].BuildingArea
                        this.toSave.ConstructionArea = this.constructionArea[0].ConstructionArea
                        this.toSave.TotalFloorArea = this.constructionArea[0].TotalFloorArea
                        this.toSave.Floor1stArea = this.constructionArea[0].Floor1stArea
                        this.toSave.Floor2ndArea = this.constructionArea[0].Floor2ndArea
                        this.toSave.Floor3rdArea = this.constructionArea[0].Floor3rdArea

                        // ** YANE COMPUTATION FUNCTION **
                        
                        const Yane = (data) => {
                            let floorNumber = data.Storey.substring(0, 1)
                            let floorArea = ""
                            if(floorNumber === "1"){
                                floorArea = data.Floor1stArea
                            }else if(floorNumber === "2"){
                                floorArea = data.Floor2ndArea
                            }else if(floorNumber === "3"){
                                floorArea = data.Floor3rdArea
                            }
                            let houseType = data.HouseType
                            let multiplyer = 0
                            
                            let waku = ["i-cube", "i-smile", "i-smile 2x6", "i-palette", "i-smart"]

                            if(waku.includes(houseType)){
                                multiplyer = 1.2
                            }else{
                                multiplyer = 1.5
                            }

                            let answer = Math.ceil(floorArea * .91 * multiplyer)

                            return answer
                            
                        }

                        this.toSave.Yane = Yane(this.toSave)

                        // ** SIDING COMPUTATION FUNCTION **

                        const Siding = (data) => {
                            let totalArea = data.Floor1stArea + data.Floor2ndArea + data.Floor3rdArea
                            let Kanabakari = data.Kanabakari.substring(0,3)
                            let multiplyer = 0
                            if(Kanabakari == "240"){
                                multiplyer = 2.6
                            }else{
                                multiplyer = 3.1
                            }
                            let menshinAdditional = 0
                            if(data.Menshin != "なし"){
                                menshinAdditional = .91 * .3 * data.Floor1stArea
                            }

                            let answer = Math.floor(((totalArea * multiplyer * .91) + menshinAdditional) * 1.2)
                            return answer
                        }
                        this.toSave.Siding = Siding(this.toSave)
                        // Siding(this.toSave)

                        this.isLoading = false
                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                        this.isLoading = false
                    })
            })
            
        
        }
    }
}
</script>