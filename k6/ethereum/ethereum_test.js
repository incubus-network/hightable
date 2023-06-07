import http from 'k6/http'
import exec from "k6/execution";

const addresses = [
	"0xA6A197a18E6a8ea37E68E3263B3E00AE5a294e5f",
	"0x12662ae45E2416aA11E9CE9ea74feb8baaB5ee54",
	"0x3d773096E8ea4cD592735bc5FfdfdA4884cfea87",
	"0xc96582FC18144fcf0bDBFde98674b031a17e0999",
	"0xAd0E4d49196546789FC0450B6b7d3e8797A5E957",
	"0xbc52595aBB63F651f281C07eaC7f38f513E543d0",
	"0x59a479A0e2A5B92BF75b7CB8f8d31f8Fcd673F36",
	"0x72b83A4B4749Cf0329B14D515CBF41134706D497",
	"0xAc408255C6FC030D78a654A21bD23Ebc6Cf81163",
	"0x40747f58DA23f4f5e429661C185a69eA4A193748",
	"0x68921f4343C6246Bb812E6D174196021716c6bF0",
	"0x06fE3FcCF021DdD8A06e71bE8e5e63705069CA51",
	"0xA1AAe23B2AFE0C2F05090BFc6fa2C168B2b2991b",
	"0x4526868334495099692a785F686bB129D99cC630",
	"0x9e64c83E2C4660107B7B20DB78744D29e0917438",
	"0xdCB31E161114bf6f4e70D79E645E10C441D0bc5C",
	"0x4D2c4Ae2974642b70036f45227B99Ed4651F9Ad6",
	"0x622f108A75a38f8B7AF3b8E787d01B49B6d86E84",
	"0xf7EBcdaEBA400b7a89b0C9944959676eA43239B1",
	"0x605FB26b242b639eF79A6Ed4ab7c4656f57e575b",
	"0x71d10AAC85d7Da0D0c7d54e740e588a71F9EdB76",
	"0x554CE32564C83F05CBBcB1F3c6af53B09112a8bb",
	"0xdbB3A6Bd1F1c786b434F83704077f8f32C5e7F33",
	"0x86Bc95EBec286571E6C33218026d723207222895",
	"0xbC621deCbfe6d58D5f83cc8a4Fb94f268a65E82A",
	"0x309c7A5F410771c9cF857DE24c25d518A347C955",
	"0x2bec6cAc29Af1AC5AD721E12730c73994ce544D7",
	"0x61983Ecde351e35D7497cF44f1fBee8Bf523b3c1",
	"0x7e06a3c273219b8d824d3FD6755274cC3E821b9E",
	"0x5432483827BAfA060d5120D14b74959b1934B85E",
	"0xe67BF4ab5356647f17d523F84CF375f700BA0870",
	"0xbE8fae7A0d6a1847E01791F2a89b109D5a432126",
	"0xDc16B7b21CF8205ECc61c2f576032675BefCdF4e",
	"0x73F01a5Df2956CE66aE7729Ec1160e007D98dD7A",
	"0x6f49c282644C46eF4810BdB8FEa009c48C62D1E3",
	"0x36eAA4C775f4FfD0286B322aC04Cf7188288A1ad",
	"0x6769fD7004E5015bcf348855991898905AddEF4b",
	"0x0dbf423efFEF05AcB7A6c8d2455b69DBa16308D6",
	"0x5960A0B05Dea5af2466dCa9A3b0C26B5b80E741c",
	"0x287C6bECA4089AA03CA3a881922ad3892e493D09",
	"0x60011b909Cbf34F3268406195D4173A973A33D0a",
	"0xFfc55D234AE120647cA7bdA10900029f2222c524",
	"0x6B8ACb05D1CCcbcA97cfAf542F95901d45d7ade6",
	"0xb39c525E0bB92E6Dbc8521caf313F28e4E6179b7",
	"0x9D6F0EEd3A3F635c30cac70A970538202617A15d",
	"0xdE367eF5ff95AEC24739D9a4d3435565B4f88Bba",
	"0x79d6C219a57b186A3C5571b4E631FB8FbfEb3750",
	"0x37682F5dfe3E6f9A629d5f7674808bE988D33506",
	"0xCDa0E2731E37c4b808D596D5fC0975c67A205e89",
	"0xaBe2468C1b6b4488B65188e4d868472e41D72236",
	"0x7B3F26ECE5C5e45E6296EeB8c151b255513d2A6a",
	"0x5e3cDff13455bdC8cc8277e57D5408529a40196B",
	"0x7B38bfF1a9f627d343757b3A7a038c9c9bEED830",
	"0x5f12578C84b7A206AdCd3aBe9C1FCfe3e8485678",
	"0x3DcFBD53074A6ddC7033F7ef99676bE7DFa4E794",
	"0xF2517468Bb12E0ABD07Bc01ecB2d9228133f1274",
	"0x795bBA6Bc3196Cb5E9369A66A72628b3687FABbE",
	"0xEdFDcccE5Dc2212268fb265FdD9F8135f810479c",
	"0x10684aeA4204137bc086b4761229ef306E684CD2",
	"0xb68F641e2BC2a20Ce3532153129233a2fb1F817e",
	"0xc2222EB1Cf40A7C18b12b7e6932f6FDA46ABB01D",
	"0x1973C16234158b0653E8096Ad86D0157DD1C5783",
	"0xC621232FC5ee715075f119da146419CEE4086CBA",
	"0x9a7Fe59F5B6F3dfe6918BeE89631AE23f31C2D19",
	"0xA546bBea9d3494e96E730031AC3bc634952f0822",
	"0x1D7B05dbc7B14f5F3f005e3fF6dF797E61751CDb",
	"0x574fAf2aADf3EBC12b46E0b594D51e035f551BcB",
	"0x1C2d17D00DF3f34f715719059B2820609490BD04",
	"0xb0f2d77787B4D0cA2619E4CD69cb378d67579699",
	"0x9AbDfd5a26A11e822d1Eb0046F2aDF0CaA8B662d",
	"0x7D61F4314875D86821cD283142286160b5E04a51",
	"0x219459Da11b474c1a68Fb9C4c1a2C32BdFf6a71f",
	"0x28CFD1D3c999d4152024B101deb0468f1fC1512f",
	"0x5A84440A6C642Ba07B20cF40b6af6901441Cc717",
	"0x1F0Bd03e7A9FCF5feeD0aFD3858bB0924668D65b",
	"0x94dBEb200A851A453fb7ce38bAF081979538BC90",
	"0x2b4Cad7528fC78D8582950748802609E6b823700",
	"0xB97C117E47890A08b52cC81F9D0d0A73e9278816",
	"0x1F0357B77f1990956c59D5c3c80b039E8BAC0077",
	"0x9AFa48eE8918473De8bbA731796C5E7700065b57",
	"0xAF2f26a1515Fb135E66B60121B73899Bf2802673",
	"0xA5BCDc6f20cE97d80D6cE84b467CaDA3544BA04e",
	"0x1B0B6919Aa6b47b665f1246BB12d13EB390d10C1",
	"0x5D3E608956B572ae985138C9155f3405DebFAE37",
	"0xe20059276f7EF408064eF7bFe8A92ab5bb8a1750",
	"0x6E8D3D155d5708A201C662D3b6fFb4BeFe8360A7",
	"0x395A37bb7552Cf8C24e25Bc0ADC5c21C13e347Bf",
	"0x7DA86Ef6B76aFC85D73e00cA645D6dEA2e908Be6",
	"0x10327521e68250f9A8752b9318e414f39603A608",
	"0x9FC91Ff93b367F038CF70923a8439856cFF41991",
	"0x38EDe0106c4BdF60ECfD3e019a1415374D79a7d6",
	"0x1f75DDd2818B8F49197358785BcE928740905A72",
	"0x5530EB8d7db4866D439d32E19C0ff0c5aD0dc42f",
	"0x608A9112209D5136e4aB0FadB398B89A1072a1aD",
	"0xDDE80B8434F01f472E4c447F006A4fc8dB6E5c44",
	"0x0d7659E4c268c680BC2ee90EF7D2d65A345E0Cf1",
	"0x1752D1e2109f3305933B1E9FFf09bF13aC5c1ace",
	"0x47236d3308415Ac44676C8757d87Fd21e2e2Ff66",
	"0xa0f6EbA67Ba39405cb0E8Dc21b7f4ad926807415",
	"0x3a91E5BCCABE22ecC485D0E7982DdB5A5D95B83e",
	"0x3Ea925C7d89Ff6464Aff894c28c6416d7715b743",
	"0x5E7E2d6a545603e85EB5fCC51f555e0BF063F523",
	"0x9FD579149452172FE18ba7f14d3DA61a07D269C8",
	"0x116AE88dEcBd32Fb833F73a9F2b13137f9CC3b26",
	"0x778838b33104c15b136322b0716c68aE941eA2d5",
	"0x8CFA5898587027ac63240847C6C3B0563536F505",
	"0x515d66dBA5F8Aa8702950a164Ca0eaA842b01435",
	"0x2D8ffAB541702Be42EC8A2716a251D49a4B09224",
	"0x4B830fC1e4923f3be327283B5006600658b1213E",
	"0x241a9122A274c1095044019f717cb35311582518",
	"0x6997b8689A254E3217C72557fb1d97fb3D2872C9",
	"0x7a41681B4C090a583FD0437c4C91a8B54C45eBad",
	"0xe102F6d2B4A83F3c2BC0F6d8E6d175165e6ca270",
	"0x1dD61bc21F90efe9919228db151DE5B7C69F59B2",
	"0x274634D45453f69F61952AB9801839C4791D78b5",
	"0x17D6206aae6a1aC7A05191586217Ec4fEF23F2B1",
	"0xF271D99Ee14Ee32b7Fd9485D958254547791B741",
	"0x9f121a720FEfddc8bFd281358F6d9d8595d4b30D",
	"0xEA153C8636C344dA8BFe1f983F5b6665051FF3A5",
	"0x23353c6831eE487707b82E8a9582Bdae87646e8F",
	"0x76066Ff17B9CDA2364f3095F14D2882db4c9F3A5",
	"0x7557EF809F214859AbD072Eb0f3aF7Aba6DEf445",
	"0x8fEfDd87f24893aaA598453f01b4f3c4c3ce89b3",
	"0xbb7cCcF34a27a859b49D7666F7214D68a1F699f2",
	"0xAeCd53bd2e8fE0335d9a1A8EF9B7F89c4582Ac5F",
	"0xa1E4dB3cF8F3dddcb04b9c8D5b623953a36a2409",
	"0xc61be99615Ffef7CF7037B6c120fDe8f3ad00903",
	"0x57E97A0fc091b8d66ff33FF89e3904C9E82A77d5",
	"0x8269E5000057A1d8A224ec58f8086E4e56C6621a",
	"0x9ad9cEDa30d9ca8500E1816518398209e80f6f01",
	"0x8289bD78A1246798631E58b043d9180460DCA5ed",
	"0x5AE5FC5B98eEb09A4f0077F63B7d9bdC48ef70a1",
	"0x73a41d70E21D64783D2372dBDd9e4240DF8f939b",
	"0xC46c96F7Cc010142e33E771AE74BffE8da7e3670",
	"0x8a9e93624bf6686B57dB537E0B5a23699977c7A6",
	"0xA3b5e42a2f1612622b8c77d76453534A51ac5B4A",
	"0xcc995A846038Be2F3D78E03580069ad2Fc567043",
	"0xA5669157c103193bd337b159e6D2ea1976F9D701",
	"0x233138AD84a2c6A7Dc71cCE274BFA1db8A486253",
	"0x70EaF41Cb87Ba72888EeEaB4e76E8334Cbee1672",
	"0x8e0f3973b831fc2e255F61Eb75c32898d7A7481A",
	"0xFC0C04a7bfaaE0232b1D3cbAAf11D7f15175b776",
	"0x14805e5658d65bBa3D59285484C081Fb042c1027",
	"0x1687DC9Ff82a93B71b3Bc05aA210ACF3Ba20C19d",
	"0x5E73036bB87d2d1B82F3F39a6329E05bFb65548E",
	"0x48C0A85cA9f0Cf02330aBc6Ef5E27083A5eD107c",
	"0xd5fa4c6C2b7259bd9acF61080e3f56b9b877ccD8",
	"0x3e4F580050c0b0e6369294c7Dc7F149390533aE2",
	"0x022DA5Df890652e6e1b9D6503947857f135fcEb6",
	"0x7334fC974692755501840790203A09f54eDa5777",
	"0x6809eBE696256bfD146B9b36bF47A8A5c7E5FdDE",
	"0x8614299E1D04437A77247580774080598E8F29aa",
	"0xd663ad18C62A4c0bfFc510Af5abA3cC3F514Cd20",
	"0x0027Dde9D1a2E389A36A1841a2Ae7c7f4E09C498",
	"0x5d9C6dc8B996f13448972F778Bdf374258415C68",
	"0xF0C88E9CC971863DDcE3F2248f9861B0b4899B37",
	"0x6cC1740d99954EcD81CBab8db258A623cc99390D",
	"0x515B55d2A7f916fccDe3E2b05b9a6dca9f8Ec636",
	"0x12Ebb7BbD43d58aa011EC6684Eb9A1dD21984E74",
	"0xc030BFB431083a069505204C46f132FF5BF93B70",
	"0x1b153164dc2A3e7853a0eCd6A1966e455340A9C4",
	"0x29Ffb5d75439b9A08348905a089695B548C01BeC",
	"0x7cF64C19B9feB8b6A069830e8b96685cBeB01415",
	"0x7113fa4744B253F7a8FfC06b243f0330c36f60E8",
	"0x539E45048CF4198a1c6640faD50FbE23065639A1",
	"0x2883e56a21aE75Af0F5bEAdCB14f437dd7304b83",
	"0xa1137a80475000E750F0A28d7f5d204A19dF5138",
	"0x90E7192745c5a954BaF0C686204987809D289131",
	"0xaEd8D811f1f8640E098602C46A3F83C5E9eC5e5f",
	"0xf14Ea61101AEA028834687AD12f144f9aa7f7FF8",
	"0x87764C342dDfc640eEd360F5d820e5732276d195",
	"0x19096861864f9eb417aE7182F6174D33E9bD8458",
	"0xfEB19F7B49e9594506D81bbBFBA5DF853732db61",
	"0x601e5CF1E5c5A2fb4866a66f30a9B31BDd51a107",
	"0x444f0c6D41F01C00Ae0217e9826a8201CF647cf9",
	"0x091c254a2F6416c31822418Aa0928b4601cCCC4D",
	"0x4757181e04CCAdE63583E4FF8Da4B86c4199260F",
	"0x392F19fA0DfA0093CB050D2d35C5fdb0205316fD",
	"0x861d7499AAe8a30563c680D7D999a85b43f9fc61",
	"0x4144D68D574dF94EFe59E4547443Bd924409c762",
	"0x9291F142f6FA72248a9B94013A6C66712E4C89eC",
	"0x70b1D32Fc522695219CDb36c07E8EFc7A6F32e8b",
	"0xE72DFc97aAb1A6A2E485df889dd7998f9F074de5",
	"0x4B61d33F0a4C2b182ecBBa2b640fdAA00982A785",
	"0x78d3557f977d937398F20F153bfc16d85F97Dd56",
	"0x7Bf2c41f07269E7e68A7E84526aCA4d331ec5f1e",
	"0xF534B6Ff26a9969222E0A8fA66Cb06380D223A42",
	"0x67Ce061a2dCd80FC5B362fd3F1b8129BB5a86c37",
	"0x59385AE820155fB5d7D2c47463e31C83eb6499Ca",
	"0x66a21722b0Db5E795A5472A73F92Dc5E394fAd23",
	"0x346763B64359eC95b0BCe72ac8059EB7A9Dd9Aa2",
	"0x6a30AA70E8401B55f95846D52837CABeCB606131",
	"0x864F29E209694e27340b2321f339F54Ee27F4fB1",
	"0xf84E34c20F0C9Cb32d943D3E5dBa1A630d354A6f",
	"0x18880a55019c141d77A516Ace38CA61c00caaDfb",
	"0x191fCA507aa67da1905b40c5375eb7d3335781C8",
	"0x3F05506AF9F09464f2028BC813B8ACe2241985c0",
	"0x6c1BaA387bd7D726DbF5Cc123707290b140d9b2B",
	"0xC22f7feE30e9205b90FF600fDa2CFDB99AC79F8D",
	"0x65956199819a4a0596c1e374dFc441BEE97B9958",
]

export const options = {
	scenarios: {
		rps: {
			executor: 'constant-arrival-rate',
			duration: "5m",
			rate: 1000,
			preAllocatedVUs: 2500,
			maxVUs: 10000,
		},
	},
	thresholds: {
		'http_req_duration{scenario:rps}': ['p(95) < 800'],
		'http_req_failed{scenario:rps}': ['rate<0.01'],
        	'http_req_duration{status:200}': ['max>=0'],
        	'http_req_duration{status:429}': ['max>=0'],
	},
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'count'],
}

export default function () {
	http.get(`https://api.ethereum.incubus-network.com/api/v1/account/${addresses[exec.scenario.iterationInTest%addresses.length]}`)
}

export function handleSummary(data) {
  return {
    "/out/ethereum/results/result.json": JSON.stringify(data),
  }
}