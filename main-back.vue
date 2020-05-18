<template lang="pug">
yx-container-better.asset-status
    .asset-top(slot="top")
        open-process(:process="50")
        Start(v-model='showStart')
        van-popup(position="bottom" v-model="showAssetSource")
                .buttonClass
                    .cancel(@click="cancelHandle") 取消
                    .sure(@click="completeHandle")  完成
                .select
                    .wrap-select
                        .botton-wrap()
                            a.isNoActive(
                                :class="{active: assetSource[item]}"
                                @click="onClickAssetSource(item)"
                                v-for=("item in assetList")
                                :key="item"
                                ref="item") {{item}}
        van-popup(position="bottom" v-model="showPopup")
                van-picker(
                    ref="picker"
                    :columns="columns[flag]"
                    :value-key="form[flag]"
                    @confirm="confirmPression"
                    @cancel="showPopup = false" show-toolbar)
    .asset-status-container(slot="main")
        .as-tips(@click="showStart = true")
            .iconfont.icon-yinyong
            p 为了给您提供匹配的金融产品和服务，了解您的风险能力和偏好是必要的
        .ic-title 资产状况与投资目标
        van-field.bp-field(
            placeholder="请选择年收入"
            @click.native="selectHandler('yearIncome')"
            disabled
            v-model='form.yearIncome'
            label='年收入')
            .button.text-color2(slot="button")
                van-icon(name="arrow-down" size="16px")
        van-field.bp-field(
            placeholder="请选择净资产"
            @click.native="selectHandler('netAssets')"
            disabled
            v-model='form.netAssets'
            label='净资产')
            .button.text-color2(slot="button")
                van-icon(name="arrow-down" size="16px")
        van-field.bp-field(
            @click.native="selectAssetSource()"
            disabled
            v-model='form.assetSource'
            label='资产来源')
            .button.text-color2(slot="button")
                van-icon(name="arrow-down" size="16px" )
        van-field.bp-field(
            placeholder="请选择投资预算"
            disabled
            @click.native="selectHandler('investBudget')"
            label="投资预算"
            v-model='form.investBudget')
            .button.text-color2(slot="button")
                van-icon(name="arrow-down" size="16px")
        <!--van-field.bp-field(-->
            <!--placeholder="请选择预计年投资金额（港币）"-->
            <!--disabled-->
            <!--label-width="280px"-->
            <!--@click.native="selectHandler('touzhi')"-->
            <!--label="年投资额"-->
            <!--v-model='form.touzhi')-->
                <!--.button.text-color2(slot="button")-->
                    <!--van-icon(name="arrow-down" size="16px")-->
        .purpose.relation.text-color7 投资目的
            van-radio-group.text-color(v-model="form.investTarget")
                van-radio(v-for="item,index in purpose" :name="item" :key="item")
                    p.pp {{item.split('（')[0]}}
                        span {{'（' + item.split('（')[1]}}
        .ic-title.relation 投资经验
        van-field.bp-field(
            placeholder="请输入"
            label="股票"
            @click.native="selectHandler('stockExperience')"
            disabled
            v-model='form.stockExperience')
            .button.text-color2(slot="button")
                van-icon(name="arrow-down" size="16px")
        <!--van-field.bp-field(-->
            <!--placeholder="请输入"-->
            <!--@click.native="selectHandler('zhaiquan')"-->
            <!--disabled-->
            <!--v-model='form.zhaiquan'-->
            <!--label='债券')-->
                <!--.button.text-color2(slot="button")-->
                    <!--van-icon(name="arrow-down" size="16px")-->
        <!--van-field.bp-field(-->
                <!--placeholder="请输入"-->
                <!--@click.native="selectHandler('huhuijijin')"-->
                <!--disabled-->
                <!--v-model='form.huhuijijin'-->
                <!--label='互惠基金')-->
            <!--.button.text-color2(slot="button")-->
                <!--van-icon(name="arrow-down" size="16px")-->
        <!--van-field.bp-field(-->
            <!--placeholder="请输入"-->
            <!--@click.native="selectHandler('renguzheng')"-->
            <!--disabled-->
            <!--v-model='form.renguzheng'-->
            <!--label='认股证')-->
                <!--.button.text-color2(slot="button")-->
                    <!--van-icon(name="arrow-down" size="16px")-->
        <!--van-field.bp-field(-->
            <!--placeholder="请输入"-->
            <!--@click.native="selectHandler('gupiaoqiquan')"-->
            <!--disabled-->
            <!--v-model='form.gupiaoqiquan'-->
            <!--label='股票期权')-->
                <!--.button.text-color2(slot="button")-->
                    <!--van-icon(name="arrow-down" size="16px")-->
        van-field.bp-field(
            placeholder="请输入"
            @click.native="selectHandler('futureOptionExperience')"
            disabled
            v-model='form.futureOptionExperience'
            label='期货期权')
                .button.text-color2(slot="button")
                    van-icon(name="arrow-down" size="16px")
        p.p-tips.text-color3 如港股的窝轮牛熊证、美股的股票期权
        .sc-title 衍生产品的认知评估
        p.p-tips.text-color3 窝轮、牛熊证、ETF、期权等包含衍生工具的产品
        van-checkbox-group(v-model='selectDerivative')
            van-checkbox.yx-checkbox(
                v-for="item,index in derivative"
                :key="index" :name="index")
                img(
                    slot="icon"
                    slot-scope="props"
                    :class="{unselected: !props.checked}"
                    :src="`/webapp/open-account/open-account/sign/${props.checked ? '' : 'no'}confirm.png`"
                )
                p(v-html="item")
    .footer-button-box.flex(slot="bottom")
        van-button(
            v-if="!isYouxinApp"
            @click="goLastStep"
            size="large"
            type="default"
        ) 上一步
        van-button(
            size="large"
            :disabled="disabled"
            type="primary"
            @click="onNextStep"
        ) 下一步:风险披露
</template>

<script>
import {
    Icon,
    Popup,
    Picker,
    RadioGroup,
    Radio,
    Checkbox,
    CheckboxGroup
} from 'vant'
import Start from './start.vue'
export default {
    keepalive: true,
    mixins: [require('../../mixins/mix-router.js').default],
    components: {
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Picker.name]: Picker,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        Start
    },
    async created() {
        const data = await this.$accountService.getAssetInvest()
        for (let key in this.form) {
            data[key] && this.$set(this.form, key, data[key])
        }
    },
    data() {
        return {
            isActive: false,
            showStart: true,
            radio: '',
            assetList: [
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
            derivative: [
                `我曾学习过衍生产品，或接受过培训和课程`,
                `我具有和衍生产品相关的工作经验`,
                `在过去3年，我操作过5次以上的衍生产品交易`
            ],
            purpose: [
                `资产保值（获得股息收入，关心资产保值大于增值）`,
                `资产稳健增值（寻求较高收益，接受有限的投资亏损）`,
                `资产快速增值（追求高回报，同时能坦然接受投资亏损）`
            ],
            showPopup: false,
            columns: {
                yearIncome: [
                    '20万元以下',
                    '20万-50万元',
                    '50万-100万元',
                    '100万元以上'
                ],
                netAssets: [
                    '50万元以下',
                    '50万-250万元',
                    '250万-500万元',
                    '500万元以上'
                ],
                investBudget: [
                    '1万元以下',
                    '1万至10万元',
                    '10万至50万元',
                    '50万元以上'
                ],
                stockExperience: [
                    '一年以下',
                    '一年至三年',
                    '三年至五年',
                    '五年以上'
                ],
                futureOptionExperience: [
                    '一年以下',
                    '一年至三年',
                    '三年至五年',
                    '五年以上'
                ]
                //TODO  有待于修改名称，保持跟后端一致
                // touzhi: ['少于30万', '30万-100万', '100万-500万', '500万 以上'],
                // zhaiquan: ['1-3年', '3-5年', '5-10年', '超过10年'],
                // huhuijijin: ['1-3年', '3-5年', '5-10年', '超过10年'],
                // renguzheng: ['1-3年', '3-5年', '5-10年', '超过10年'],
                // gupiaoqiquan: ['1-3年', '3-5年', '5-10年', '超过10年']
            },
            form: {
                futureOptionExperience: '一年以下',
                investBudget: '1万至10万元',
                investTarget: '资产保值（获得股息收入，关心资产保值大于增值）',
                netAssets: '50万元以下',
                stockExperience: '一年以下',
                yearIncome: '20万元以下',
                assetSource: '薪酬、存款',
                cognitiveAssessment: 1
                // touzhi: '少于30万',
                // zhaiquan: '1-3年',
                // huhuijijin: '1-3年',
                // renguzheng: '1-3年',
                // gupiaoqiquan: '1-3年'
            },
            // 标识哪个选框
            flag: '',
            showAssetSource: false,
            assetSource: {
                薪酬: true,
                存款: true
            }
        }
    },
    methods: {
        selectAssetSource() {
            this.form.assetSource.split('、').forEach(item => {
                item && this.$set(this.assetSource, item, true)
            })
            this.showAssetSource = true
        },
        cancelHandle() {
            this.showAssetSource = false
        },
        completeHandle() {
            this.form.assetSource = Object.keys(this.assetSource)
                .filter(key => this.assetSource[key])
                .join('、')
            this.cancelHandle()
        },
        onClickAssetSource(asset) {
            this.$set(this.assetSource, asset, !this.assetSource[asset])
        },
        selectHandler(params) {
            this.showPopup = true
            this.flag = params
            this.$nextTick(() => {
                this.$refs.picker.setColumnIndex(
                    0,
                    this.columns[this.flag].indexOf(this.form[this.flag])
                )
            })
        },
        confirmPression(val) {
            this.showPopup = false
            this.form[`${this.flag}`] = val
        },
        async onNextStep() {
            try {
                await this.$accountService.setAssetInvest(this.form)
                this.goApplyStep()
            } catch (e) {
                await this.$toast(e.msg || '网络开小差了,请稍后重试')
            }
        }
    },
    computed: {
        selectDerivative: {
            get() {
                let re = []
                for (let i = 0; i < 6; i++) {
                    this.form.cognitiveAssessment & Math.pow(2, i) && re.push(i)
                }
                return re
            },
            set(val) {
                let cognitiveAssessment = 0
                val.forEach(i => {
                    cognitiveAssessment += Math.pow(2, i)
                })
                this.$set(this.form, 'cognitiveAssessment', cognitiveAssessment)
            }
        },
        // 按钮是否可用
        disabled() {
            let form = { ...this.form }
            delete form.cognitiveAssessment
            return Object.values(form).some(item => !item)
        }
    }
}
</script>

<style lang="scss">
.asset-status {
    .asset-status-container {
        .van-radio__icon .van-icon {
            border: 0.02rem solid rgba(25, 25, 25, 0.2);
        }
        .van-checkbox {
            display: flex;
            img {
                width: 18px;
            }
            .van-checkbox__icon {
                display: flex;
                align-items: center;
            }
        }
        .sc-title {
            height: 22px;
            font-size: 18px;
            font-weight: 500;
            margin-top: 20px;
        }
        .yx-checkbox {
            p {
                span {
                    font-weight: bold;
                }
            }
        }
        .van-checkbox__icon,
        .van-checkbox__label {
            height: auto;
        }
        .purpose {
            .yx-checkbox {
                padding-top: 20px;
            }
            .pp {
                span {
                    font-size: 12px;
                }
            }
        }
        .van-radio {
            display: flex;
            padding-top: 16px;
        }
        .van-picker__cancel {
            color: $text-color5;
        }
        .van-radio__input {
            font-size: 16px;
        }
        .van-radio .van-icon-check {
            background-image: url(/webapp/open-account/open-account/nochoose.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            height: 16px;
        }
        .van-radio .van-icon-checked {
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
                color: $text-color7;
            }
        }
        .van-cell__title,
        .van-cell__value {
            flex: inherit;
        }
        .van-cell__value {
            flex: 1;
        }
        .van-field__control:disabled {
            color: $text-color;
        }
        .van-cell:after {
            content: ' ';
            position: absolute;
            pointer-events: none;
            box-sizing: border-box;
            left: 0;
            right: 0;
            bottom: 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            border-bottom: 1px solid #ebedf0;
        }
    }
}
</style>

<style lang="scss" scoped>
.asset-status {
    .buttonClass {
        font-weight: 400;
        font-family: PingFangSC-Regular;
        width: 375px;
        height: 40px;
        background: rgba(241, 243, 248, 1);
        font-size: 16px;
        line-height: 45px;
        display: flex;
        padding-left: 14px;
        .cancel {
            color: rgba(53, 53, 71, 1);
        }
        .sure {
            color: rgba(40, 90, 200, 1);
            margin-left: 283px;
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
            font-size: 16px;
            .botton-wrap {
                display: flex;
                flex-wrap: wrap;
            }
            .isButtonCommon {
                width: 79px;
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
            }
            .isNoActive:not(:nth-child(3n)) {
                @extend .isButtonCommon;
                margin-right: 54px;
                color: rgba(53, 53, 71, 1);
                background-image: url(/webapp/open-account/open-account/noSelect.png);
            }
            .active:nth-child(3n) {
                @extend .isButtonCommon;
                color: rgba(60, 120, 250, 1);
                background-image: url(/webapp/open-account/open-account/select@2x.png);
            }
            .active:not(:nth-child(3n)) {
                @extend .isButtonCommon;
                margin-right: 54px;
                color: rgba(60, 120, 250, 1);
                background-image: url(/webapp/open-account/open-account/select@2x.png);
            }
        }
    }
    .asset-status-container {
        padding: $global-padding;
        .p-tips {
            font-size: 12px;
            padding-top: 10px;
        }
        .van-cell {
            padding: 10px 3px 10px 0;
        }
        .purpose {
            .yx-checkbox {
                padding-top: 20px;
            }
            .pp {
                span {
                    font-size: 12px;
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
            .van-cell:after {
                content: ' ';
                position: absolute;
                pointer-events: none;
                box-sizing: border-box;
                left: 0;
                right: 0;
                bottom: 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                border-bottom: 1px solid #ebedf0;
            }
        }
    }
    .unselected {
        color: #e1e1e1;
    }
    .yx-checkbox {
        padding-top: 15px;
    }
    .icon-confirm {
        color: $primary-color-line;
    }
    .sc-tips {
        padding-top: 16px;
        font-size: 12px;
    }
    .upload-idcard {
        padding: 14px 0 20px;
    }
    .ic-title {
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 6px;
    }
    .relation {
        margin-top: 30px;
    }
}
</style>
