<template lang="pug">
    yx-container.account-container(:class="{'app-type-ch':appType.Ch}")
        .main(slot="main")
            .result-text(v-show="showWarn")
                span {{result}}
                span.colse(@click="closeWarnHandle" v-if="status===40") {{$t(['关闭提醒','關閉提醒','Close'])}}
            .line(v-show="showWarn")
            .form-wrapper
                h2.title {{pageText.title}}
                h3.sub-title {{$t('account.subTitle')}}
                .from(:class="{isOtherBank:isOtherBank}")
                    van-cell-group
                        van-field(
                        :label="$t('account.labelUserName')"
                        :placeholder="$t('account.placeholder1')"
                        v-model="form.userName"
                        disabled
                        )
                        van-field(
                        disabled
                        :placeholder="$t('account.placeholder2')"
                        v-model="form.bankName"
                        @click.native="showBankPopup"
                        )
                            i(class="icon-pull-down iconfont icon-pulldown_icon" slot="icon" v-if="!isNeedDisabled")
                            span(slot="label") {{$t('account.labelBankName')}}
                        van-field(
                        :placeholder="$t('account.placeholder3')"
                        v-model="form.otherBank"
                        v-if="isOtherBank"
                        )
                            span.other-bank(slot="label") {{$t('account.labelOtherBank')}}
                        van-field(
                        v-model="form.bankAccountView"
                        :label="$t('account.labelBankAccount')"
                        :placeholder="$t('account.placeholder4')"
                        @keyup="checkBankAccountView(form.bankAccountView)"
                        :disabled="isNeedDisabled"
                        )
                        van-field(
                        :label="$t('account.labelAccountType')"
                        disabled
                        v-model="form.accountType"
                        :placeholder="$t('account.placeholder5')"
                        @click.native="showAccountTypePopup"
                        )
                            i(class="icon-pull-down iconfont icon-pulldown_icon" slot="icon" v-if="status!==20")
                        van-field(
                        :label="$t('account.userBankCountry')"
                        disabled
                        v-model="form.beneficiaryBankCountry"
                        )
                        van-field(
                        v-if="is16country"
                        :label="$t('account.userBankAddress')"
                        maxlength="100"
                        v-model="form.userBankAddress"
                        )
                        van-field(
                        v-if="is16country"
                        :label="$t('account.userBankSwiftCode')"
                        maxlength="100"
                        v-model="form.bankSwift"
                        )
                        van-field(
                        v-if="is16country"
                        maxlength="100"
                        :label="$t('account.userCountry')"
                        v-model="form.beneficiaryCountry"
                        )
                        van-field(
                        v-if="is16country"
                        maxlength="100"
                        :label="$t('account.userAddress')"
                        v-model="form.userAddress"
                        )
                    yx-upload.upload-box(v-if="isSupportWithOut")(
                        :title="$t(['账户证明（选填）','帳戶證明（選填）','Account Proof （Optional）'])"
                        :subTitle="$t(['银行账户开户证明：银行结单、开户资料、银行卡','銀行賬戶開戶證明：銀行結單、開戶資料、銀行卡','Proof of Bank Account: Bank Statement, Account openning proof, ATM Card'])"
                        :specialSubTitle="$t(['需显示持卡人姓名','需顯示持卡人姓名','including cardholding name'])"
                        :maxNum="5"
                        :isReadOnly="[20,30].includes(status)?true:false"
                        v-model="form.openAccPicUrl"
                    )
                    .warning__info(v-show="isSupportWithOut")
                        .warning__info-title {{$t(['温馨提示：','溫馨提示：','Tips:'])}}
                        .warning__info-content {{warningText}}
                            span.warning__info-link(@click="handleGoFeeDetail") {{$t(['点击查看收费标准','點擊查看收費標準','Click here to check the fees schedule'])}}
        .footer(slot="bottom")
            .submit-button
            van-button(
                size="large"
                type="primary"
                class="bottom-button"
                :disabled="disabled"
                @click="submit"
            ) {{pageText.btn}}
            yx-popup(
            v-model="bankShow"
            position ="bottom")
                van-picker(
                :confirm-button-text="$t('account.buttonTextConfirm')"
                :cancel-button-text ="$t('account.buttonTextCancel')"
                class="picker"
                show-toolbar
                :columns="bankList"
                @cancel="onCancel"
                @confirm="onConfirm"
                )
            yx-popup(
                v-model="isShowAccountTypeList"
                position ="bottom"
            )
                yx-account-type(
                    v-model="selectAccountTypeList"
                    :accountTypeList="accountTypeList"
                    @handleConfirm ="handleConfirm"
                    @handleCancel ="handleCancel"
                )
</template>

<script>
/**
 * 出金流程（门店开户）-添加/编辑香港银行卡账户
 * @ Author LINJIAJUN
 * @ Date 2019/04/10
 */
import { mapGetters } from 'vuex'
import { Popup, Picker } from 'vant'
import yxAccountType from '@/biz-components/yx-account-type'
import yxUpload from '@/components/yx-upload'
import { ImagePreview } from 'vant'
import Vue from 'vue'
import {
    bindingEdit,
    bindingSave,
    bindingInfo,
    getDictionary,
    bankBasicInfoPage,
    bankBasicInfoListV1
} from '@/service/stock-capital-server.js'
import {}
import {
    enumAccountType,
    WITHDRAW_AUDIT_STATUS
} from '@/utils/common/global-enum'
import { appType } from '@/utils/html-utils.js'
export default {
    components: {
        [Popup.name]: Popup,
        [Picker.name]: Picker,
        yxAccountType,
        yxUpload
    },
    i18n: {
        zhCHS: {
            '11': '港币账户',
            '12': '美元账户',
            '13': '人民币账户'
        },
        zhCHT: {
            '11': '港幣賬戶',
            '12': '美元賬戶',
            '13': '人民幣賬戶'
        },
        en: {
            '11': 'HKD',
            '12': 'USD',
            '13': 'CNH'
        }
    },
    data() {
        return {
            is16country: true,
            pageText: {
                title: '',
                btn: ''
            },
            fromPage: '',
            submitFlag: false,
            isOtherBank: false,
            bankShow: false,
            isShowAccountTypeList: false,
            accountTypeValue: '',
            pageType: '',
            accountTypeList: [],
            bankList: [],
            bankListSource: [],
            // TODO 16国新添加字段
            // 汇款银行账户地区
            // userBankCountry: '',
            // userBankCountryCode: '', // 汇款银行账户地区 code
            // // swift code
            // userBankSwiftCode: '', // 用户银行SwiftCode
            // // 汇款人所在国家地区
            // userCountry: '', // 汇款人所在国家地区
            // // 汇款银行地址
            // userBankAddress: '', // 用户银行地址
            // // 汇款人地址
            // userAddress: '' // 用户地址
            form: {
                bankCardId: '',
                userName: '',
                bankName: '',
                bankAccount: '',
                bankAccountView: '',
                otherBank: '',
                accountType: '',
                bankCode: '',
                bankRtgs: '',
                // 16国新增字段
                // 汇款银行国家/地区
                beneficiaryBankCountry: '',
                // Swift Code
                bankSwift: '',
                // 汇款人国家地区
                beneficiaryCountry: '',
                // 汇款银行地址
                userBankAddress: '',
                // 汇款人地址
                userAddress: '',
                openAccPicUrl: []
            },
            clicked: false,
            isView: '',
            selectAccountTypeList: [],
            selectAccountTypeListSource: [],
            appType,
            warningText: this.$t([
                'uSMART友信证券推出快速出金功能。您可提交账户证明认证当前银行账户，认证成功后即可开通。目前快速出金支持港币即时转账，同时该功能会收取手续费。',
                'uSMART友信證券推出快速出金功能。您可提交賬戶證明認證當前銀行賬戶，認證成功後即可開通。目前快速出金支持港幣即時轉賬，同時該功能會收取手續費。',
                'uSMART Securities launched a quick withdrawal function. You can submit an account certificate to verify the current bank account, and it can be opened after the verification is successful. Fast withdrawals currently support Hong Kong dollar real-time transfers, at the same time this function will charge a handling fee. '
            ]),
            result: '账户审核中，预计一个工作日完成审核',
            showWarn: false,
            status: '',
            auditFailReason: '', // 审核失败原因
            isSupportWithOut: false, // 是否支持快速出金
            WITHDRAW_AUDIT_STATUS
        }
    },
    computed: {
        ...mapGetters([`user`, 'isAutoWithdrawGray']),
        disabled() {
            return (
                this.rules.some(item => !this.form[item]) ||
                (this.isOtherBank && !this.form.otherBank) ||
                this.status === 20
            )
        },
        isFormDepositManage() {
            return this.$route.query.fromPage === 'deposit-manage'
        },
        rules() {
            let rules = [
                'userName',
                'bankName',
                'bankAccountView',
                'accountType'
            ]
            if (!this.is16country) {
                return rules
            }
            let extra_16_rules = [
                'beneficiaryBankCountry',
                'bankSwift',
                'beneficiaryCountry',
                'userBankAddress',
                'userAddress'
            ]
            return [...rules, ...extra_16_rules]
        },
        isNeedDisabled() {
            return (
                this.$route.query.fromPage === 'deposit-manage' ||
                [20, 30].includes(this.status)
            )
        }
    },
    watch: {
        'form.bankAccountView'(val) {
            if (val.length > 30) {
                this.form.bankAccountView = val.slice(0, 30)
            }
        },
        'form.otherBank'(val) {
            if (val.length > 50) {
                this.form.otherBank = val.slice(0, 50)
            }
        }
    },
    methods: {
        handleGoFeeDetail() {
            this.$jsBridge.gotoNewWebview(
                window.location.origin +
                    '/webapp/open-account-hk/withdrawal.html#/fees'
            )
        },
        handleConfirm(selectAccountTypeList) {
            this.selectAccountTypeList = selectAccountTypeList
            this.selectAccountTypeListSource = this.selectAccountTypeList.concat(
                []
            )
            if (this.selectAccountTypeList.length === 3) {
                this.accountTypeValue = enumAccountType.ALL
            } else {
                this.accountTypeValue = selectAccountTypeList.join(',')
            }
            this.form.accountType = this.parseAccountTypeName(
                selectAccountTypeList
            )
            this.isShowAccountTypeList = false
        },
        handleCancel() {
            this.selectAccountTypeList = this.selectAccountTypeListSource.concat(
                []
            )
            this.isShowAccountTypeList = false
        },
        parseAccountTypeName(accountTypeList) {
            if (!accountTypeList || accountTypeList.length === 0) return
            let accountTypeName = ''
            if (accountTypeList.length === 3) {
                accountTypeName = this.$t([
                    '综合账户(港币/美元/人民币)',
                    '綜合賬戶(港幣、美元、人民幣)',
                    'Integrated Account (HKD, USD, CNH)'
                ])
            } else {
                accountTypeName = accountTypeList
                    .map(item => this.$t(item))
                    .join(',')
            }
            return accountTypeName
        },
        checkBankAccountView(value) {
            this.form.bankAccountView = value.replace(/\D/g, '')
            if (this.form.bankAccountView.length === 30) {
                this.$toast(this.$t('validator.maxLength'))
                return
            }
            this.form.bankAccountView = this.parseBankAccount(
                this.form.bankAccountView
            )
        },
        parseBankAccount(value) {
            return (value + '')
                .replace(/\s/g, '')
                .replace(/(\d{4})(?=\d)/g, '$1 ')
        },
        parseBankAccountToValue(value) {
            return (value + '').replace(/\s/g, '')
        },
        onCancel() {
            this.bankShow = false
        },
        onConfirm(value, index) {
            this.bankShow = false
            let item = this.bankListSource[index]
            if (item.bankCode === 'OTHER') {
                this.isOtherBank = true
                this.isSupportWithOut = false
            } else {
                this.isOtherBank = false
                // 判断选中的银行是否支持快速出金 不支持的就不展示凭证
                this.isSupportWithOut =
                    this.isAutoWithdrawGray && item.eddaWithoutState === 1
                        ? true
                        : false
            }
            this.form.bankName = value
            this.form.bankCode = item.bankCode
            this.form.bankRtgs = item.bankRtgs
            if (!this.isSupportWithOut) {
                this.form.openAccPicUrl = []
            }
        },
        showBankPopup() {
            this.bankShow = this.isNeedDisabled ? false : true
        },
        showAccountTypePopup() {
            this.selectAccountTypeList = this.selectAccountTypeListSource.concat(
                []
            )
            this.status === 20
                ? (this.isShowAccountTypeList = false)
                : (this.isShowAccountTypeList = true)
        },
        async getCustOpenAccountInfo() {
            try {
                let data = await this.$accountService.getCustOpenAccountInfo()
                this.form.userName = data.lastName
                    ? `${data.realName || ''} ${data.lastName} ${
                          data.firstName
                      }`
                    : `${data.realName || ''} ${data.realNameEn || ''}`
            } catch (e) {
                this.$toast(e.msg || this.$t('netErrorTips'))
            }
        },
        async getOpenAccountBasicInfo() {
            try {
                let data = await this.$accountService.getOpenAccountBasicInfo()
                this.form.userName = `${data.realName || data.realNameEn} ${
                    data.lastName
                } ${data.firstName}`
            } catch (e) {
                this.$toast(e.msg || this.$t('netErrorTips'))
            }
        },
        async bindingInfo(id) {
            try {
                let params = {
                    bankCardId: id
                }
                this.$loading()
                let data = await bindingInfo(params)
                // 如果是16国的，需要展示16国字段
                //判断依据：汇款银行账户地区如果非香港
                // if (
                //     !['香港', 'Hong Kong'].includes(data.beneficiaryBankCountry)
                // ) {
                //     this.is16country = true
                // }
                this.form.bankCardId = data.id
                this.form.bankName = data.userBankName
                this.form.bankAccount = data.userBankAccountNo
                this.form.bankCode = data.userBankCode
                this.form.bankRtgs = data.userBankRtgs
                this.accountTypeValue = data.userBankAccountTypeStr
                this.status = data.auditStatus
                this.auditFailReason = data.auditFailReason
                this.isSupportWithOut =
                    this.isAutoWithdrawGray && data.eddaWithoutState === 1
                        ? true
                        : false

                this.form.openAccPicUrl = data.openAccPicUrl || []
                if (this.accountTypeValue.indexOf('10') !== -1) {
                    this.selectAccountTypeList = [
                        enumAccountType.HK,
                        enumAccountType.US,
                        enumAccountType.CN
                    ]
                } else {
                    this.selectAccountTypeList = data.userBankAccountTypeStr.split(
                        ','
                    )
                }
                this.selectAccountTypeListSource = this.selectAccountTypeList.concat(
                    []
                )
                this.form.bankAccountView = this.parseBankAccount(
                    this.form.bankAccount
                )
                this.form.accountType = this.parseAccountTypeName(
                    this.selectAccountTypeList
                )
                // 如果是16国入金
                // if (this.is16country) {
                //     this.form.beneficiaryBankCountry =
                //         data.beneficiaryBankCountry
                //     this.form.bankSwift = data.userBankSwift
                //     this.form.beneficiaryCountry = data.beneficiaryCountry
                //     this.form.userBankAddress = data.userBankAddress
                //     this.form.userAddress = data.userAddress
                // }
                if (this.form.bankCode === 'OTHER') {
                    this.isOtherBank = true
                    this.isSupportWithOut = false
                    this.form.otherBank = this.form.bankName
                    this.form.bankName = this.$t('bank.otherBank')
                }
                this.$close()
            } catch (e) {
                this.$toast(e.msg || this.$t('netErrorTips'))
            }
        },
        // 获取账户类型列表
        async getDictionary() {
            try {
                let params = {
                    dictionaryType: 'AccountTypeEnum'
                }
                let data = (await getDictionary(params)) || {}
                this.accountTypeList = data.dictionaryDatas
                    .map(item => {
                        return {
                            value: item.value,
                            label: item.desc
                        }
                    })
                    .filter(item => item.value !== '10')
            } catch (e) {
                this.$toast(e.msg || this.$t('netErrorTips'))
            }
        },
        async submit() {
            if (
                this.isSupportWithOut &&
                ![20, 30].includes(this.status) &&
                !this.form.openAccPicUrl.length
            ) {
                await this.$confirm({
                    message: this.$t([
                        '您当前未提交银行账户凭证，如不上传凭证提交后该账户只能提交普通出金申请，是否确认操作？',
                        '您當前未提交銀行賬戶憑證，如不上傳憑證提交後該賬戶只能提交普通出金申請，是否確認操作？',
                        '您当前未提交银行账户凭证，如不上传凭证提交后该账户只能提交普通出金申请，是否确认操作？'
                    ]),
                    confirmButtonText: this.$t(['确认', '確認', 'Confirm']),
                    cancelButtonText: this.$t(['取消', '取消', 'Cancel'])
                })
            }
            this.form.bankAccount = this.parseBankAccountToValue(
                this.form.bankAccountView
            )
            let params = Object.assign({}, this.form, {
                accountType: this.accountTypeValue,
                bankAscription: this.is16country ? '3' : '2', // 银行归属  1-大陆  2-香港 3-境外
                userId: this.user.userId,
                openAccPicUrl: this.isSupportWithOut
                    ? this.form.openAccPicUrl
                    : []
            })
            let confirmText = this.$t(['我知道了', '我知道了', 'OK'])
            if (this.isOtherBank) {
                params.bankName = this.form.otherBank
            }
            if (!this.clicked) {
                this.clicked = true
                this.$loading()
                if (this.pageType === 'add') {
                    try {
                        await bindingSave(params)
                        this.$close()
                        if (
                            this.isSupportWithOut &&
                            params.openAccPicUrl.length > 0
                        ) {
                            await this.$alert({
                                message: this.$t([
                                    '您已提交申请，预计1个工作日完成审核，审核通过后可使用快速转账方式出金，当前可使用该账户作普通出金',
                                    '您已提交申請，預計1個工作日完成審核，審核通過後可使用快速轉賬方式出金，當前可使用該賬戶作普通出金',
                                    'You have submitted your application, the review process will usually take 1 day. You can choose rapid withdrawal once your account is verified. You can choose the standrard withdrawal method'
                                ]),
                                confirmButtonText: confirmText
                            })
                        }
                        this.$imgToast({
                            message: this.$t('account.tips1'),
                            cb: () => {
                                this.$router.replace({
                                    name: this.$route.query.fromPage
                                })
                            }
                        })
                    } catch (e) {
                        this.clicked = false
                        this.$toast(e.msg || this.$t('account.tips2'))
                    }
                } else {
                    try {
                        await bindingEdit(params)
                        this.$close()
                        if (
                            this.isSupportWithOut &&
                            params.openAccPicUrl.length > 0 &&
                            this.status !==
                                WITHDRAW_AUDIT_STATUS.AUDIT_SUCCESS.value
                        ) {
                            await this.$alert({
                                message: this.$t([
                                    '您已提交申请，预计1个工作日完成审核，审核通过后可使用快速转账方式出金，当前可使用该账户作普通出金',
                                    '您已提交申請，預計1個工作日完成審核，審核通過後可使用快速轉賬方式出金，當前可使用該賬戶作普通出金',
                                    'You have submitted your application, the review process will usually take 1 day. You can choose rapid withdrawal once your account is verified. You can choose the standrard withdrawal method'
                                ]),
                                confirmButtonText: confirmText
                            })
                        }
                        this.$imgToast({
                            message: this.$t('account.tips3'),
                            cb: () => {
                                if (
                                    this.$route.query.fromPage ===
                                    'deposit-manage'
                                ) {
                                    if (this.$jsBridge.isYouxinApp) {
                                        this.$jsBridge.callApp(
                                            'command_close_webview'
                                        )
                                    } else {
                                        window.location.replace(
                                            `${window.location.origin}/webapp/open-account-hk/deposit.html#/manage-account`
                                        )
                                    }
                                } else {
                                    this.$router.replace({
                                        name: 'manage-account'
                                    })
                                }
                            }
                        })
                    } catch (e) {
                        this.clicked = false
                        this.$toast(e.msg || this.$t('account.tips4'))
                    }
                }
            }
        },
        // 查询展示银行列表
        async bankBasicInfoPage() {
            try {
                this.$loading()
                let params = {
                    containsTotalCount: true,
                    orderBy: '',
                    pageNum: 1,
                    pageSize: 30,
                    query: {
                        bankAccountName: '',
                        bankAscription: '1' // 银行归属地 1-香港  2-大陆
                    }
                }
                let { datas = [] } = this.isAutoWithdrawGray
                    ? await bankBasicInfoListV1(params)
                    : await bankBasicInfoPage(params)
                this.bankListSource = datas
                this.bankList = datas.map(item => {
                    return item.bankName || item.bankNameSimplified
                })
                this.$close()
            } catch (e) {
                this.$toast(e.msg)
            }
        },
        closeWarnHandle() {
            this.showWarn = false
        },
        // 审核提示信息
        auditMsgFun() {
            if (this.status === 20) {
                this.result = this.$t([
                    '账户审核中，预计一个工作日完成审核',
                    '賬戶審核中，預計壹個工作日完成審核',
                    'Bank account is being reviewed, the review process will usually take 1 day'
                ])
                this.showWarn = true
            } else if (this.status === 40) {
                this.result = this.$t([
                    `账户审核未通过，暂不支持快速出金，您可修改后再提交。驳回原因：${this.auditFailReason}，请核实后再提交友信审核。`,
                    `賬戶審核未通過，暫不支持快速出金，您可修改後再提交。駁回原因：${this.auditFailReason}，請核實後再提交友信審核。`,
                    `Account verification failed, reason: ${this.auditFailReason}. Rapid withdrawal cannot be used at the moment. Please modify and submit the application again. `
                ])
                this.showWarn = true
            } else {
                this.showWarn = false
            }
        },
        async imgPreview(url) {
            if (!url) return false
            Vue.prototype.$imgPreview = ImagePreview({
                images: [url],
                closeOnPopstate: true
            })
        }
    },
    async created() {
        delete window.h5HistoryBack
        window.h5HistoryBack = () => {
            if (this.$route.query.fromPage === 'deposit-manage') {
                this.$jsBridge.callApp('command_close_webview')
            } else {
                history.back()
            }
            return true
        }
        let { type } = this.$route.query
        this.pageType = type
        this.$loading()
        Promise.all([
            this.getCustOpenAccountInfo(),
            this.getDictionary(),
            this.bankBasicInfoPage()
        ]).finally(() => {
            this.$close()
        })
        if (this.pageType === 'edit') {
            this.pageText.title = this.$t('account.title2')
            this.pageText.btn = this.$t('account.btnModifyText')
            await this.bindingInfo(this.$route.query.bindingId)
        } else {
            this.pageText.title = this.$t('account.title1')
            this.pageText.btn = this.$t('account.btnAddText')
        }
        this.auditMsgFun()
    }
}
</script>
<style lang="scss">
.form-wrapper {
    .van-cell {
        padding: 20px 0;
        font-size: 16px;
        .van-cell__title {
            opacity: 0.5968;
            color: $hk-text-color;
            width: 125px !important;
        }
    }
    .van-hairline--top-bottom::after {
        border: none;
    }
    .van-cell::after {
        content: ' ';
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        left: 80px;
        right: 0;
        bottom: 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        border-bottom: 1px solid #ebedf0;
    }
}
.app-type-ch {
    .yx-popup .van-popup--bottom {
        width: 100%;
        border-radius: unset;
        bottom: 0;
    }
    .van-cell {
        padding: 10px 0;
        font-size: 14px;
    }
    .van-cell:first-child::after {
        border-bottom: none;
    }
    .van-cell:not(:last-child)::after {
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
    .van-cell::after {
        left: 0;
    }
    .isOtherBank {
        .van-cell:nth-child(2)::after {
            left: 80px;
        }
        .van-cell:nth-child(3)::after {
            left: 80px;
        }
    }
    .van-picker__cancel {
        color: rgba(53, 53, 71, 1);
    }
}
.account-container {
    .upload-box {
        .upload__title {
            font-size: 16px !important;
        }
    }
    .img-list-container {
        .upload-title {
            font-size: 14px;
            // line-height: 40px;
            margin-bottom: 10px;
            color: $text-color3;
            span {
                font-size: 12px;
            }
            .special {
                color: #f59a23;
            }
        }
        .img-list-read {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            img {
                width: 86px;
                height: 112px;
                margin-bottom: 13px;
                margin-right: 13px;
                align-items: center;
            }
        }
    }
}
</style>
<style scoped lang="scss">
.result-text {
    padding: 12px 18px;
    .colse {
        padding-left: 10px;
        color: $primary-color;
    }
}
.line {
    width: 100%;
    height: 6px;
    background-color: $edda-bgc-color;
}
.form-wrapper {
    padding: 18px;
    font-size: 12px;
    .title {
        font-size: 28px;
        font-weight: 500;
    }
    .sub-title {
        opacity: 0.5;
    }
}
.app-type-ch {
    .form-wrapper {
        .title {
            font-size: 18px;
            font-weight: 500;
        }

        .sub-title {
            font-size: 12px;
            opacity: 0.5;
        }
        .from {
            margin-top: 33px;
            .other-bank {
                visibility: hidden;
            }
        }
    }
    .submit-button {
        padding: 0 16px;
        .bottom-button {
            border-radius: 4px !important;
        }
    }
}
.warning__info {
    .warning__info-title {
        font-size: 14px;
    }
    .warning__info-link {
        color: $hk-text-highlight-color;
    }
}
.icon-pull-down {
    padding-right: 10px;
    font-size: 10px;
}
.picker {
    padding: 10px;
}
.tips {
    padding: 10px 0;
}
</style>
