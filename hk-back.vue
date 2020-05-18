<template lang="pug">
yx-container-better.asset-status
    .asset-status-top(slot="top")
        van-popup(position="bottom" v-model="showAssetSource")
                .buttonClass
                    .cancel(@click="cancelHandle") {{$t('cancelInfo')}}
                    .title {{pickerTitle}}
                    .sure(@click="completeHandle")  {{$t('completeInfo')}}
                .select
                    .wrap-select
                        .botton-wrap()
                            a.isNoActive(
                                v-for="item,index in assetList"
                                :class="{active: assetSource[item]}"
                                @click="onClickAssetSource(item)"
                                :key="item") {{item}}
        van-popup(position="bottom" v-model="showPopup")
            van-picker(
                ref="picker"
                :title="pickerTitle"
                :columns="columns[flag]"
                :value-key="form[flag]"
                @confirm="confirmPression"
                :cancel-button-text="$t('cancelButtonInfo')"
                :confirm-button-text="$t('confirmButtonInfo')"
                @cancel="showPopup = false" show-toolbar)
        yx-hk-popup(
            v-model="showSelect"
            position="bottom"
            :list="selectList"
            :title="$t('InvestmentObj')"
            @checkedHandle="checkedInvestTarget")
    .asset-status-container(slot="main")
        .ic-title {{$t('FinancialInfo')}}
        .asset-status-tip {{$t('statusTip')}}
        yx-hk-field.field-name(
            :placeholder="$t('AnnualIncome')"
            arrow
            readonly
            v-model="form.yearIncome"
            @click.native="selectHandler('yearIncome')")
        yx-hk-field.field-name(
            :placeholder="$t('NetAWorth')"
            arrow
            readonly
            v-model="form.netAssets"
            @click.native="selectHandler('netAssets')")
        yx-hk-field.field-name(
            :placeholder="$t('SourceOfAsset')"
            arrow
            readonly
            v-model="form.assetSource"
            @click.native="selectAssetSource('assetSource')")
        <!--yx-hk-field.field-name(-->
            <!--:placeholder="$t('touzhi')"-->
            <!--arrow-->
            <!--readonly-->
            <!--v-model="form.touzhi"-->
            <!--@click.native="selectHandler('touzhi')")-->
        .ic-title.relation {{$t('InvestmentExp')}}
        .asset-status-tip {{$t('statusTip')}}
        yx-hk-field.field-name(
            :placeholder="$t('InvestmentObj')"
            arrow
            readonly
            v-model="form.investTarget"
            @click.native="selectInvestTarget('investTarget')")
        yx-hk-field.field-name(
            :placeholder="$t('yearslong')"
            arrow
            readonly
            v-model="form.stockExperience"
            @click.native="selectHandler('stockExperience')")
        <!--yx-hk-field.field-name(-->
            <!--:placeholder="$t('zhaiquan')"-->
            <!--arrow-->
            <!--readonly-->
            <!--v-model="form.zhaiquan"-->
            <!--@click.native="selectHandler('zhaiquan')")-->
        <!--yx-hk-field.field-name(-->
            <!--:placeholder="$t('huhuijijin')"-->
            <!--arrow-->
            <!--readonly-->
            <!--v-model="form.huhuijijin"-->
            <!--@click.native="selectHandler('huhuijijin')")-->
        yx-hk-field.field-name(
            :placeholder="$t('derExpInfo')"
            :field-tip="$t('renzhenTip')"
            arrow
            readonly
            v-model="form.futureOptionExperience"
            @click.native="selectHandler('futureOptionExperience')")
        <!--yx-hk-field.field-name(-->
            <!--:placeholder="$t('gupiaoqiquan')"-->
            <!--arrow-->
            <!--readonly-->
            <!--v-model="form.gupiaoqiquan"-->
            <!--@click.native="selectHandler('gupiaoqiquan')")-->
        <!--yx-hk-field.field-name(-->
            <!--:placeholder="$t('qihuoqiquan')"-->
            <!--arrow-->
            <!--readonly-->
            <!--v-model="form.qihuoqiquan"-->
            <!--@click.native="selectHandler('qihuoqiquan')")-->
        .ic-title.relation {{$t('estimate')}}
        p.p-tips.text-color5 {{$t('something')}}
        .purpose.relation.text-color7 {{$t('mulSelect')}}
        van-checkbox(
            v-for="item in purpose"
            v-model="item.val"
            :key="item.key")
            p.pp {{item.text}}

    .footer-button-box.flex(slot="bottom")
        van-button(
            v-if="!isYouxinApp"
            @click="goLastStep"
            size="large"
            type="default"
        ) {{$t('lastStepText')}}
        van-button(
            size="large"
            :disabled="disabled"
            type="primary"
            @click="onNextStep"
        ) {{$t('continue')}}
</template>

<script>
import { Icon, Popup, Picker, Checkbox } from 'vant'
import {
    addHkAssetInvest,
    getHKAssetInvest
} from '@/service/user-account-server-hk.js'
import { throttleSim } from '@/utils/tools'
import { compareVersion } from '@/utils/tools'
import { openAccountAppsflyer } from '../../utils/burying-point'
import { appVersion } from '@/utils/html-utils.js'
export default {
    name: 'asset-status',
    i18n: {
        zhCHS: {
            FinancialInfo: '财务状况',
            statusTip: '用于综合评估您的风险承受能力和偏好',
            AnnualIncome: '年收入',
            NetAWorth: '净资产',
            SourceOfAsset: '资产来源',
            InvestmentExp: '投资经验',
            InvestmentObj: '投资目标',
            estimate: '衍生品的认知评估',
            yearslong: '股票投资年限',
            something: '窝轮、牛熊证、ETF、期权等包含衍生工具的产品',
            mulSelect: '以下问题可多选，没有符合可不勾选',
            continue: '继续',
            assetPre: '资产保值',
            valuePre: '获得股息收入，关心资产保值大于增值',
            StAssetpre: '资产稳健增值',
            profit: '寻求较高收益，接受有限的投资亏损',
            rapid: '资产快速增值',
            returnPro: '追求高回报，同时能坦然接受投资亏损',
            yearIncomeInfo: '年收入 (港币)',
            netAssetsInfo: '净资产 (港币)',
            assetSourceInfo: '资产来源(多选)',
            // touzhi: '预计年投资金额（港币',
            stockExpInfo: '股票投资年限',
            // zhaiquan: '债券',
            // huhuijijin: '互惠基金/单位信托基金',
            derExpInfo: '认股证投资年限',
            // gupiaoqiquan: '股票期权',
            // qihuoqiquan: '期货期权',
            assetListInfo: [
                '薪酬',
                '存款',
                '租金',
                '继承',
                '投资利润',
                '借贷',
                '退休金',
                '经营收入',
                '其他'
            ],
            studyPro: '我曾学习过衍生产品或接受过培训和课程',
            haveExp: '我具有和衍生产品相关的工作经验',
            lastTreYear: '在过去3年，我操作过5次以上的衍生产品交易',
            salaryInfo: '薪酬',
            depositsInfo: '存款',
            rentInfo: '租金',
            heritageInfo: '继承',
            investmentInfo: '投资利润',
            loanInfo: '借贷',
            pensionInfo: '退休金',
            businessInfo: '经营收入',
            otherInfo: '其他',
            behind20: '20万以下',
            twto50: '20万-50万',
            fiveto100: '50万-100万',
            after100: '100万以上',
            behinde50: '50万以下',
            fiveto250: '50万-250万',
            twfto500: '250万-500万',
            after500: '500万以上',
            less1year: '1年以下',
            onetothrYear: '1-3年',
            thrtofivYear: '3-5年',
            afterFive: '5年以上',
            cancelInfo: '取消',
            completeInfo: '完成',
            pleaseChoose: '请选择',
            renzhenTip: `（窝轮牛熊证等）`
        },
        zhCHT: {
            FinancialInfo: '財務狀況',
            statusTip: '用於綜合評估您的風險承受能力和偏好',
            AnnualIncome: '年收入',
            NetAWorth: '淨資產',
            SourceOfAsset: '資產來源',
            InvestmentExp: '投資經驗',
            InvestmentObj: '投資目標',
            estimate: '衍生品的認知評估',
            yearslong: '股票投資年限',
            something: '窩輪、牛熊證、ETF、期權等包含衍生工具的產品',
            mulSelect: '以下問題可多選，沒有符合可不勾選',
            continue: '繼續',
            assetPre: '資產保值',
            valuePre: '獲得股息收入，關心資產保值大於增值',
            StAssetpre: '資產穩健增值',
            profit: '尋求較高收益，接受有限的投資虧損',
            rapid: '資產快速增值',
            returnPro: '追求高回報，同時能坦然接受投資虧損',
            yearIncomeInfo: '年收入(港幣)',
            netAssetsInfo: '淨資產 (港幣)',
            assetSourceInfo: '資產來源(多選)',
            // touzhi: '預計年投資金額（港幣）',
            stockExpInfo: '股票投資年限',
            // zhaiquan: '債券',
            // huhuijijin: '互惠基金/單位信託基金',
            derExpInfo: '認股證投資年限',
            // gupiaoqiquan: '股票期權',
            // qihuoqiquan: '期貨期權',
            assetListInfo: [
                '薪酬',
                '存款',
                '租金',
                '繼承',
                '投資利潤',
                '借貸',
                '退休金',
                '經營收入',
                '其他'
            ],
            studyPro: '我曾學習過衍生產品或接受過培訓和課程',
            haveExp: '我具有和衍生產品相關的工作經驗',
            lastTreYear: '在過去3年，我操作過5次及以上的衍生產品交易',
            salaryInfo: '薪酬',
            depositsInfo: '存款',
            rentInfo: '租金',
            heritageInfo: '繼承',
            investmentInfo: '投資利潤',
            loanInfo: '借貸',
            pensionInfo: '退休金',
            businessInfo: '經營收入',
            otherInfo: '其他',
            behind20: '20萬以下',
            twto50: '20萬-50萬',
            fiveto100: '50萬-100萬',
            after100: '100萬以上',
            behinde50: '50萬以下',
            fiveto250: '50萬-250萬',
            twfto500: '250萬-500萬',
            after500: '500萬以上',
            less1year: '1年以下',
            onetothrYear: '1-3年',
            thrtofivYear: '3-5年',
            afterFive: '5年以上',
            cancelInfo: '取消',
            completeInfo: '完成',
            pleaseChoose: '請選擇',
            renzhenTip: `（窩輪牛熊證等）`
        },
        en: {
            FinancialInfo: 'Financial Background',
            statusTip: 'Evaluate your risk tolerance and preference',
            AnnualIncome: 'Annual Income',
            NetAWorth: 'Net Asset Worth',
            SourceOfAsset: 'Source of Asset',
            InvestmentExp: 'Investment Background',
            InvestmentObj: 'Investment Objective',
            estimate: 'Derivative Products Knowledge Assessment',
            yearslong: 'Stocks Investment Experience',
            something: '',
            mulSelect:
                'You can select one or more items as shown below. If none, please leave blank.',
            continue: 'Continue',
            assetPre: 'Asset Preservation',
            valuePre: 'Aim for dividend yield more than asset appreciation',
            StAssetpre: 'Steady Asset Appreciation',
            profit: 'Aim for higher return, accept limited losses',
            rapid: 'Rapid Asset Appreciation',
            returnPro: 'Aim for high return, accept investment losses',
            yearIncomeInfo: 'Annual Income (HKD)',
            netAssetsInfo: 'Net Asset Worth (HKD)',
            assetSourceInfo: 'Source of Asset (Multiple)',
            // touzhi: 'Estimated Investment Amount/Pre Year (HK$)',
            stockExpInfo: 'Stocks Investment Experience',
            // zhaiquan: 'Bond',
            // huhuijijin: 'Mutual Funds /Unit Funds',
            derExpInfo: 'Derivative Investment Experience',
            // gupiaoqiquan: 'Stock Options',
            // qihuoqiquan: 'Futures/Options',
            assetListInfo: [
                'Salary',
                'Deposits',
                'Rent',
                'Heritage',
                'Investment',
                'Loan',
                'Pension',
                'Business',
                'Other'
            ],
            studyPro:
                'I underwent training or attended courses on derivative products that provide general knowledge in the nature and risks of derivatives',
            haveExp: 'I have work experience related to derivative products',
            lastTreYear:
                'I have relevant trading experience i.e. I have executed 5 or more transactions related to derivative products over the past 3 years',
            salaryInfo: 'Salary',
            depositsInfo: 'Deposits',
            rentInfo: 'Rent',
            heritageInfo: 'Heritage',
            investmentInfo: 'Investment',
            loanInfo: 'Loan',
            pensionInfo: 'Pension',
            businessInfo: 'Business',
            otherInfo: 'Other',
            behind20: '<200,000',
            twto50: '200,000-500,000',
            fiveto100: '500,000-1M',
            after100: '>1M',
            behinde50: '<500,000',
            fiveto250: '500,000-2.5M',
            twfto500: '2.5M-5M',
            after500: '>5M',
            less1year: 'Less than 1 year',
            onetothrYear: '1-3years',
            thrtofivYear: '3-5years',
            afterFive: 'More than 5 years',
            cancelInfo: 'Cancel',
            completeInfo: 'Confirm',
            pleaseChoose: 'Please Select',
            renzhenTip: `(Warrant, CBBC, etc.)`
        }
    },
    keepalive: true,
    mixins: [require('../../mixins/mix-router.js').default],
    components: {
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        [Checkbox.name]: Checkbox
    },
    data() {
        return {
            showSelect: false,
            selectList: [
                {
                    text: this.$t('assetPre'),
                    tip: this.$t('valuePre')
                },
                {
                    text: this.$t('StAssetpre'),
                    tip: this.$t('profit')
                },
                {
                    text: this.$t('rapid'),
                    tip: this.$t('returnPro')
                }
            ],
            title: {
                yearIncome: this.$t('yearIncomeInfo'),
                netAssets: this.$t('netAssetsInfo'),
                assetSource: this.$t('assetSourceInfo'),
                stockExperience: this.$t('stockExpInfo')
                // futureOptionExperience: this.$t('derExpInfo'),
                // touzhi: this.$t([
                //     '预计年投资金额（港币)',
                //     '預計年投資金額（港幣）',
                //     'Estimated Investment Amount/Pre Year (HK$)'
                // ]),
                // zhaiquan: this.$t(['债券', '債券', 'Bond']),
                // huhuijijin: this.$t([
                //     '互惠基金/单位信托基金',
                //     '互惠基金/單位信託基金',
                //     'Mutual Funds /Unit Funds'
                // ]),
                // gupiaoqiquan: this.$t([
                //     '股票期权',
                //     '股票期權',
                //     'Stock Options'
                // ]),
                // qihuoqiquan: this.$t([
                //     '期货期权',
                //     '期貨期權',
                //     'Futures/Options'
                // ])
            },
            pickerTitle: this.$t('pleaseChoose'),
            isActive: false,
            radio: '',
            assetList: this.$t('assetListInfo'),
            purpose: [
                { text: this.$t('studyPro'), val: false },
                { text: this.$t('haveExp'), val: false },
                {
                    text: this.$t('lastTreYear'),
                    val: false
                }
            ],
            showPopup: false,
            // 状态值编码
            yearIncome: [1001, 1002, 1003, 1004],
            netAssets: [1001, 1002, 1003, 1004],
            investTarget: [1, 2, 3],
            futureOptionExperience: [1, 2, 3, 4],
            stockExperience: [1, 2, 3, 4],
            // touzhi: [1, 2, 3, 4, 5],
            // huhuijijin: [1, 2, 3, 4, 5],
            // gupiaoqiquan: [1, 2, 3, 4, 5],
            // qihuoqiquan: [1, 2, 3, 4, 5],
            // zhaiquan: [1, 2, 3, 4, 5],
            codeToValue: {
                assetSource: {
                    1001: this.$t('assetListInfo')[0],
                    1002: this.$t('assetListInfo')[1],
                    1003: this.$t('assetListInfo')[2],
                    1004: this.$t('assetListInfo')[3],
                    1005: this.$t('assetListInfo')[4],
                    1006: this.$t('assetListInfo')[5],
                    1007: this.$t('assetListInfo')[6],
                    1008: this.$t('assetListInfo')[7],
                    1009: this.$t('assetListInfo')[8]
                },
                yearIncome: {
                    1001: this.$t('behind20'),
                    1002: this.$t('twto50'),
                    1003: this.$t('fiveto100'),
                    1004: this.$t('after100')
                },
                netAssets: {
                    1001: this.$t('behinde50'),
                    1002: this.$t('fiveto250'),
                    1003: this.$t('twfto500'),
                    1004: this.$t('after500')
                },
                investTarget: {
                    1: this.$t('assetPre'),
                    2: this.$t('StAssetpre'),
                    3: this.$t('rapid')
                },
                futureOptionExperience: {
                    1: this.$t('less1year'),
                    2: this.$t('onetothrYear'),
                    3: this.$t('thrtofivYear'),
                    4: this.$t('afterFive')
                },
                stockExperience: {
                    1: this.$t('less1year'),
                    2: this.$t('onetothrYear'),
                    3: this.$t('thrtofivYear'),
                    4: this.$t('afterFive')
                }
            },
            paramsCode: {
                yearIncome: '',
                netAssets: '',
                investTarget: '',
                futureOptionExperience: '',
                stockExperience: ''
            },
            columns: {
                yearIncome: [
                    this.$t('behind20'),
                    this.$t('twto50'),
                    this.$t('fiveto100'),
                    this.$t('after100')
                ],
                netAssets: [
                    this.$t('behinde50'),
                    this.$t('fiveto250'),
                    this.$t('twfto500'),
                    this.$t('after500')
                ],
                stockExperience: [
                    this.$t('less1year'),
                    this.$t('onetothrYear'),
                    this.$t('thrtofivYear'),
                    this.$t('afterFive')
                ],
                futureOptionExperience: [
                    this.$t('less1year'),
                    this.$t('onetothrYear'),
                    this.$t('thrtofivYear'),
                    this.$t('afterFive')
                ]
                // touzhi: [
                //     this.$t(['没有经验', '没有經驗', 'None']),
                //     this.$t(['1-3年', '1-3年', '1-3 years']),
                //     this.$t(['3-5年', '3-5年', '3-5 years']),
                //     this.$t(['5-10年', '5-10年', '5-10 years']),
                //     this.$t(['超过10年', '超過10年', 'Over 10 years'])
                // ],
                // zhaiquan: [
                //     this.$t(['没有经验', '没有經驗', 'None']),
                //     this.$t(['1-3年', '1-3年', '1-3 years']),
                //     this.$t(['3-5年', '3-5年', '3-5 years']),
                //     this.$t(['5-10年', '5-10年', '5-10 years']),
                //     this.$t(['超过10年', '超過10年', 'Over 10 years'])
                // ],
                // huhuijijin: [
                //     this.$t(['没有经验', '没有經驗', 'None']),
                //     this.$t(['1-3年', '1-3年', '1-3 years']),
                //     this.$t(['3-5年', '3-5年', '3-5 years']),
                //     this.$t(['5-10年', '5-10年', '5-10 years']),
                //     this.$t(['超过10年', '超過10年', 'Over 10 years'])
                // ],
                // gupiaoqiquan: [
                //     this.$t(['没有经验', '没有經驗', 'None']),
                //     this.$t(['1-3年', '1-3年', '1-3 years']),
                //     this.$t(['3-5年', '3-5年', '3-5 years']),
                //     this.$t(['5-10年', '5-10年', '5-10 years']),
                //     this.$t(['超过10年', '超過10年', 'Over 10 years'])
                // ],
                // qihuoqiquan: [
                //     this.$t(['没有经验', '没有經驗', 'None']),
                //     this.$t(['1-3年', '1-3年', '1-3 years']),
                //     this.$t(['3-5年', '3-5年', '3-5 years']),
                //     this.$t(['5-10年', '5-10年', '5-10 years']),
                //     this.$t(['超过10年', '超過10年', 'Over 10 years'])
                // ]
            },
            form: {
                futureOptionExperience: '',
                investTarget: '',
                netAssets: '',
                stockExperience: '',
                yearIncome: '',
                assetSource:
                    this.$t('salaryInfo') + '、' + this.$t('depositsInfo')
                // 新增5类信息填写
                // touzhi: '',
                // zhaiquan: '',
                // huhuijijin: '',
                // gupiaoqiquan: '',
                // qihuoqiquan: ''
            },
            // 标识哪个选框
            flag: '',
            showAssetSource: false,
            assetSourceCode: {
                [this.$t('assetListInfo')[0]]: 1001,
                [this.$t('assetListInfo')[1]]: 1002,
                [this.$t('assetListInfo')[2]]: 1003,
                [this.$t('assetListInfo')[3]]: 1004,
                [this.$t('assetListInfo')[4]]: 1005,
                [this.$t('assetListInfo')[5]]: 1006,
                [this.$t('assetListInfo')[6]]: 1007,
                [this.$t('assetListInfo')[7]]: 1008,
                [this.$t('assetListInfo')[8]]: 1009
            },
            assetSource: {
                /*  薪酬: true,
                存款: true */
            },
            // 是否已提交
            submited: false
        }
    },
    async created() {
        const data = await getHKAssetInvest()
        let {
            futureOptionExperienceCode,
            investTargetCode,
            netAssetsCode,
            stockExperienceCode,
            yearIncomeCode,
            assetSourceCode,
            cognitiveAssessment
        } = data
        this.paramsCode.yearIncome = yearIncomeCode
        this.paramsCode.netAssets = netAssetsCode
        this.paramsCode.stockExperience = stockExperienceCode
        this.paramsCode.futureOptionExperience = futureOptionExperienceCode
        this.paramsCode.investTarget = investTargetCode
        this.form.futureOptionExperience = this.codeToValue.futureOptionExperience[
            futureOptionExperienceCode
        ]
        this.form.investTarget = this.codeToValue.investTarget[investTargetCode]
        this.form.netAssets = this.codeToValue.netAssets[netAssetsCode]
        this.form.stockExperience = this.codeToValue.stockExperience[
            stockExperienceCode
        ]
        this.form.yearIncome = this.codeToValue.yearIncome[yearIncomeCode]
        this.handleCognitive(cognitiveAssessment)
        this.form.assetSource = assetSourceCode
            ? this.handleAssetSource(assetSourceCode)
            : this.handleDefaultAssetSource()
    },
    methods: {
        handleDefaultAssetSource() {
            this.assetSource = {
                [this.$t('salaryInfo')]: true,
                [this.$t('depositsInfo')]: true
            }
            return this.$t('salaryInfo') + '、' + this.$t('depositsInfo')
        },
        handleAssetSource(assetSourceCode) {
            let assetList = []
            let assetSource = {}
            let tempObj = {}
            assetSourceCode.split(',').forEach(item => {
                let name = this.codeToValue.assetSource[item]
                tempObj[name] = true
                Object.assign(assetSource, tempObj)
                assetList.push(name)
            })
            this.assetSource = assetSource
            return assetList.length > 0
                ? assetList.join('、')
                : assetList.toString()
        },
        handleCognitive(cognitiveAssessment) {
            this.purpose.forEach((item, index) => {
                item.val = (cognitiveAssessment & (1 << index)) != 0
            })
        },
        checkedInvestTarget(item) {
            this.paramsCode.investTarget = this.investTarget[item.index]
            this.form.investTarget = item.value.text
            this.showSelect = false
        },
        selectInvestTarget() {
            this.showSelect = true
        },
        selectAssetSource(params) {
            this.pickerTitle = this.title[params]
            this.form.assetSource &&
                this.form.assetSource.split('、').forEach(item => {
                    this.$set(this.assetSource, item, true)
                })
            this.showAssetSource = true
        },
        cancelHandle() {
            this.showAssetSource = false
        },
        completeHandle() {
            let assetList = Object.keys(this.assetSource).filter(
                key => this.assetSource[key]
            )
            this.form.assetSource =
                assetList.length > 0
                    ? assetList.join('、')
                    : assetList.toString()
            this.cancelHandle()
        },
        onClickAssetSource(asset) {
            this.$set(this.assetSource, asset, !this.assetSource[asset])
        },
        selectHandler(params) {
            try {
                this.pickerTitle = this.title[params]
                this.showPopup = true
                this.flag = params
                this.$nextTick(() => {
                    this.$refs.picker.setColumnIndex(
                        0,
                        this.columns[this.flag].indexOf(this.form[this.flag])
                    )
                })
            } catch (e) {
                console.log('error>>', e)
            }
        },
        confirmPression(val, index) {
            try {
                let { flag } = this
                this.paramsCode[flag] = this[flag][index]
                this.showPopup = false
                this.form[`${this.flag}`] = val
            } catch (e) {
                console.log('error>>', e)
            }
        },
        // 处理二进制位
        handleEvaluation() {
            let value = this.purpose.map(item => {
                return item.val ? 1 : 0
            })
            return value.reverse().join('')
        },
        handleSourceCode() {
            let { assetSource, assetSourceCode } = this
            let value = []
            Object.keys(assetSource).forEach(key => {
                if (assetSource[key]) {
                    value.push(assetSourceCode[key])
                }
            })
            return value.join(',')
        },
        onNextStep: throttleSim(async function() {
            if (this.submited) return
            let {
                yearIncome,
                netAssets,
                investTarget,
                futureOptionExperience,
                stockExperience
            } = this.paramsCode
            let params = {
                assetSourceCode: this.handleSourceCode(),
                futureOptionExperienceCode: futureOptionExperience,
                investTargetCode: investTarget,
                netAssetsCode: netAssets,
                stockExperienceCode: stockExperience,
                yearIncomeCode: yearIncome,
                cognitiveAssessment: this.handleEvaluation()
            }
            try {
                await addHkAssetInvest(params)
                // 开户信息埋点
                try {
                    if (compareVersion(appVersion, '3.4.0') >= 0) {
                        openAccountAppsflyer({
                            event_name:
                                'Third Step - Financial Background Check',
                            params: {
                                userName: this.$store.state.user.userName,
                                userId: this.$store.state.user.userId,
                                params
                            }
                        })
                    }
                } catch (e) {
                    console.log(e)
                }
                this.goNextStep()
                this.submited = true
            } catch (e) {
                await this.$toast(e.msg || '网络开小差了,请稍后重试')
                this.$close()
            }
        }, 1500)
    },
    computed: {
        // 按钮是否可用
        disabled() {
            return Object.values(this.form).some(item => !item)
        }
    }
}
</script>

//
<style lang="scss">
.asset-status {
    .asset-status-container {
        .purpose {
            font-size: 12px;
            font-family: PingFangHK-Regular;
            font-weight: 400;
            color: rgba(57, 57, 57, 0.4);
            line-height: 17px;
            .pp {
                span {
                    font-size: 14px;
                    font-family: PingFangHK-Regular;
                    font-weight: 400;
                    color: rgba(57, 57, 57, 1);
                    line-height: 20px;
                }
            }
        }
        .van-checkbox {
            display: flex;
            padding-top: 16px;
        }
        .van-picker__cancel {
            color: $hk-text-color5;
        }
        .van-checkbox__input {
            font-size: 16px;
        }
        .van-checkbox .van-icon-check {
            background-image: url(/webapp/open-account/open-account/nochoose.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            height: 16px;
        }
        .van-checkbox .van-icon-checked {
            background-image: url(/webapp/open-account/open-account/choose.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            height: 16px;
        }
        .van-icon-checked::before,
        .van-icon-check::before {
            display: none;
        }
        .address {
            textarea {
                line-height: 24px;
            }
        }
        .van-cell {
            line-height: 29px;
        }
        .van-cell__title {
            max-width: 100%;
            width: 80px;
            span {
                color: $hk-text-color7;
            }
        }
        .van-cell__title,
        .van-cell__value {
            flex: unset;
        }
        .van-cell__value {
            flex: 1;
        }
        .van-field__control:disabled {
            color: $hk-text-color;
        }
    }
}
</style>

<style lang="scss" scoped>
.asset-status {
    .buttonClass {
        font-weight: 400;
        width: 375px;
        height: 40px;
        background: rgba(241, 243, 248, 1);
        font-size: 16px;
        line-height: 45px;
        display: flex;
        padding-left: 14px;
        justify-content: space-between;
        .cancel {
            color: rgba(40, 90, 200, 1);
        }
        .title {
            color: #353547;
            text-align: center;
        }
        .sure {
            color: rgba(40, 90, 200, 1);
            padding-right: 14px;
        }
    }
    .select {
        width: 375px;
        height: 214px;
        background: rgba(255, 255, 255, 1);
        .wrap-select {
            padding-left: 17px;
            padding-top: 23px;
            font-weight: 400;
            font-size: 14px;
            .botton-wrap {
                display: flex;
                flex-wrap: wrap;
            }
            .isButtonCommon {
                width: 83px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                background-repeat: no-repeat;
                background-position: left top;
                background-size: contain;
                margin-bottom: 24px;
            }
            .isNoActive:nth-child(3n) {
                @extend .isButtonCommon;
                color: rgba(53, 53, 71, 1);
                background-image: url(/webapp/open-account/open-account/noSelect.png);
                background-size: 83px 38px;
            }
            .isNoActive:not(:nth-child(3n)) {
                @extend .isButtonCommon;
                margin-right: 52px;
                color: rgba(53, 53, 71, 1);
                background-image: url(/webapp/open-account/open-account/noSelect.png);
                background-size: 83px 38px;
            }
            .active:nth-child(3n) {
                @extend .isButtonCommon;
                color: rgba(60, 120, 250, 1);
                background-image: url(/webapp/open-account/open-account/select@2x.png);
                background-size: 83px 38px;
            }
            .active:not(:nth-child(3n)) {
                @extend .isButtonCommon;
                margin-right: 52px;
                color: rgba(60, 120, 250, 1);
                background-image: url(/webapp/open-account/open-account/select@2x.png);
                background-size: 83px 38px;
            }
        }
    }
    .asset-status-container {
        padding: $global-padding;
        .p-tips {
            font-size: 12px;
            padding-top: 6px;
        }
        .van-cell {
            padding: 10px 15px 10px 0;
        }
        .purpose {
            font-size: 12px;
            font-family: PingFangHK-Regular;
            font-weight: 400;
            color: rgba(57, 57, 57, 0.4);
            line-height: 17px;
            .pp {
                span {
                    font-size: 14px;
                    font-family: PingFangHK-Regular;
                    font-weight: 400;
                    color: rgba(57, 57, 57, 1);
                    line-height: 20px;
                }
            }
        }
        .address,
        .pingyin {
            .van-field {
                padding: 0;
            }
            .van-field:active {
                border-bottom: 0;
            }
            .label {
                span {
                    opacity: 0;
                }
            }
        }
    }
    .upload-idcard {
        padding: 14px 0 20px;
    }
    .ic-title {
        font-size: 28px;
        font-family: PingFangHK-Medium;
        font-weight: 500;
        color: rgba(57, 57, 57, 1);
        line-height: 40px;
        padding-bottom: 5px;
    }
    .asset-status-tip {
        font-size: 14px;
        font-family: PingFangHK-Regular;
        font-weight: 400;
        color: rgba(57, 57, 57, 0.4);
        line-height: 20px;
    }
    .relation {
        margin-top: 24px;
    }
}
</style>
