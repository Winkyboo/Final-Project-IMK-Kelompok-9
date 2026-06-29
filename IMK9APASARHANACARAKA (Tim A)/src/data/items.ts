/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MarketItem } from "../types";

export const MARKET_ITEMS: MarketItem[] = [
  // --- KATEGORI KELONTONG (Grocery Sembako) ---
  {
    id: "gula",
    name: "Gula Jawa (Palm Sugar)",
    javaneseName: "gula",
    javaneseScript: "ꦒꦸꦭ", // Gu-La
    price: 15,
    category: "kelontong",
    description: "Gula aren manis asli bumbung bambu tradisional Jawa Tengah."
  },
  {
    id: "beras",
    name: "Beras Cianjur (Rice)",
    javaneseName: "beras",
    javaneseScript: "ꦧꦼꦫꦱ꧀", // Be-Ra-s
    price: 24,
    category: "kelontong",
    description: "Beras pulen hasil sawah irigasi pegunungan."
  },
  {
    id: "kopi",
    name: "Kopi Tubruk (Coffee)",
    javaneseName: "kopi",
    javaneseScript: "ꦏꦺꦴꦥꦶ", // Ko-Pi
    price: 18,
    category: "kelontong",
    description: "Biji kopi hitam robusta digiling kasar wangi semerbak."
  },
  {
    id: "bata",
    name: "Bata Merah (Brick)",
    javaneseName: "bata",
    javaneseScript: "ꦧꦠ", // Ba-Ta
    price: 5,
    category: "kelontong",
    description: "Batu bata tanah liat bakar untuk tungku dapur."
  },

  // --- KATEGORI JAMU (Traditional Herbals) ---
  {
    id: "jahe",
    name: "Jahe Emprit (Ginger)",
    javaneseName: "jahe",
    javaneseScript: "ꦗꦲꦺ", // Ja-He
    price: 12,
    category: "jamu",
    description: "Rimpang jahe pedas hangat berkasiat meredakan demam."
  },
  {
    id: "kunyit",
    name: "Kunyit Kuning (Turmeric)",
    javaneseName: "kunyit",
    javaneseScript: "ꦏꦸꦚꦶꦠ꧀", // Ku-Nyi-t
    price: 10,
    category: "jamu",
    description: "Kunyit segar pewarna alami jamu sinom antiseptik perut."
  },
  {
    id: "kencur",
    name: "Kencur Wangi (Galangal)",
    javaneseName: "kencur",
    javaneseScript: "ꦏꦼꦚ꧀ꦕꦸꦂ", // Ke-Ncur
    price: 14,
    category: "jamu",
    description: "Bahan jamu beras kencur, membuat nafas segar bertenaga."
  },
  {
    id: "madu",
    name: "Madu Alas (Forest Honey)",
    javaneseName: "madu",
    javaneseScript: "ꦩꦢꦸ", // Ma-Du
    price: 45,
    category: "jamu",
    description: "Madu murni tawon liar pohon Randu hutan jati Kendal."
  },

  // --- KATEGORI BUAH & SAYUR (Fruits & Veggies) ---
  {
    id: "lombok",
    name: "Lombok Abang (Red Chili)",
    javaneseName: "lombok",
    javaneseScript: "ꦭꦺꦴꦩ꧀ꦧꦺꦴꦏ꧀", // Lo-Mbo-k
    price: 8,
    category: "buah",
    description: "Cabai merah keriting pedas menggigit, penambah selera makan."
  },
  {
    id: "gedhang",
    name: "Gedhang Raja (Raja Banana)",
    javaneseName: "gedhang",
    javaneseScript: "ꦒꦼꦝꦁ", // Ge-Dhang
    price: 25,
    category: "buah",
    description: "Satu sisir pisang raja ranum, manis legit bagai madu."
  },
  {
    id: "nanas",
    name: "Nanas Madu (Pineapple)",
    javaneseName: "nanas",
    javaneseScript: "ꦤꦤꦱ꧀", // Na-Na-s
    price: 15,
    category: "buah",
    description: "Nanas manis segar kupas langsung dari perkebunan lereng Gunung Kelud."
  },
  {
    id: "pala",
    name: "Pala Harum (Nutmeg)",
    javaneseName: "pala",
    javaneseScript: "ꦥꦭ", // Pa-La
    price: 11,
    category: "buah",
    description: "Biji pala eksotis berkualitas tinggi, sangat disukai pedagang mancanegara."
  },
  {
    id: "brambang",
    name: "Brambang (Shallot)",
    javaneseName: "brambang",
    javaneseScript: "ꦧꦿꦩ꧀ꦧꦁ",
    price: 10,
    category: "buah",
    description: "Bawang merah segar penambah cita rasa rempah."
  },
  {
    id: "bawang",
    name: "Bawang Putih (Garlic)",
    javaneseName: "bawang",
    javaneseScript: "ꦧꦮꦁ",
    price: 12,
    category: "buah",
    description: "Bawang putih harum penguat tumisan."
  },
  {
    id: "uyah",
    name: "Uyah Laut (Sea Salt)",
    javaneseName: "uyah",
    javaneseScript: "ꦲꦸꦪꦃ",
    price: 5,
    category: "kelontong",
    description: "Garam laut putih bersih beryodium."
  },
  {
    id: "tempe",
    name: "Tempe Kedelai (Tempeh)",
    javaneseName: "tempe",
    javaneseScript: "ꦠꦺꦩ꧀ꦥꦺ",
    price: 7,
    category: "kelontong",
    description: "Tempe kedelai murni gurih berlapis daun jati."
  },
  {
    id: "tahu",
    name: "Tahu Putih (Tofu)",
    javaneseName: "tahu",
    javaneseScript: "ꦠꦲꦸ",
    price: 6,
    category: "kelontong",
    description: "Tahu putih lembut untuk lauk sari."
  },
  {
    id: "lenga",
    name: "Lenga Klentik (Coconut Oil)",
    javaneseName: "lenga",
    javaneseScript: "ꦭꦼꦔ", // le-nga
    price: 20,
    category: "kelontong",
    description: "Minyak kelapa wangi jernih."
  },
  {
    id: "jeruk",
    name: "Jeruk Bali (Pomelo)",
    javaneseName: "jeruk",
    javaneseScript: "ꦗꦼꦫꦸꦏ꧀", // je-ru-k
    price: 22,
    category: "buah",
    description: "Jeruk Bali manis segar buah keraton."
  },
  {
    id: "salak",
    name: "Salak Pondoh (Snakefruit)",
    javaneseName: "salak",
    javaneseScript: "ꦱꦭꦏ꧀", // sa-la-k
    price: 12,
    category: "buah",
    description: "Salak pondoh legit manisan lokal."
  },
  {
    id: "suruh",
    name: "Godhong Suruh (Betel Leaf)",
    javaneseName: "suruh",
    javaneseScript: "ꦱꦸꦫꦸꦃ", // su-ru-h
    price: 4,
    category: "jamu",
    description: "Daun sirih hijau segar obat mujarab."
  },
  {
    id: "asem",
    name: "Asem Jawa (Tamarind)",
    javaneseName: "asem",
    javaneseScript: "ꦲꦱꦼꦩ꧀", // a-se-m
    price: 8,
    category: "jamu",
    description: "Asam jawa murni penyegar dahaga masakan."
  }
];

// Generate an order for gameplay
const PENJUAL_TEMPLATES_L1 = [
  "Sugeng siang, kulo pados '{name}'. Manakah bungkusan mawi Aksara Jawa ingkang leres?",
  "Mbah butuh '{name}' kagem sesaji besuk enjang. Tolong ambilkan wadah berlabel Aksara Jawi ingkang cocok nggih.",
  "Kulanuwun, badhe tumbas '{name}' kagem syukuran rukun warga. Tolong carikan kemasan mawi aksara:",
  "Nuwun sewu, kulo pados '{name}' kagem suguhan sepupu saking Solo. Pundi wadah mawi tulisan aksara:",
  "Halo juragan! Ibu ngutus kulo mundhut '{name}' kagem jualan wonten warung. Pundi aksara jawane?",
  "Sugeng ndalu nggih, wonten stok '{name}'? Pengen ngertos bungkusan mawi serat Jawi pundi?",
  "Kulo badhe tumbas '{name}' kagem bumbu pawon. Tolong carikan aksara yang tepat nggih.",
  "Hajatan krama adik sepupu mbetahaken '{name}'. Tolong pisahkan aksara ingkang jumbuh:",
  "Permisi juragan tampan, wonten bungkusan '{name}'? Saya sedang mencari bungkus mawi label aksara:",
  "Halo juragan, kulo pados '{name}' kagem jamu niki. Tolong tunjukkan aksara ingkang bener:",
  "Sugeng enjang! Apakah '{name}' taksih seger? Tolong pilihkan wadah beraksara Jawi:",
  "Wahai juragan, anak kulo rewel nyuwun '{name}'. Tolong ambilkan kemasan mawi aksara:",
  "Simbah paring arta kagem mundhut '{name}'. Pundi bungkusan aksaranya juragan?",
  "Kulo meluncur saking Sleman pados '{name}'. Pundi kemasan mawi label aksara:",
  "Kulanuwun, badhe borong '{name}' kagem kedai kopi tradisional. Tolong pilihkan aksara jawanya:",
  "Nuwun sewu, kustom kulo pados '{name}'. Pundi aksara Jawi ingkang leres kagem barang niki?",
  "Juragan, kulo badhe masak soto mbetahaken '{name}'. Tolong ambilkan kemasan mawi serat:",
  "Sugeng enjang, saya disuruh Mbah Lurah beli '{name}'. Manakah yang bermassa aksara:",
  "Hei juragan! Lapak Anda terkenal paling murah. Saya beli '{name}', tolong tunjuk wadah beraksara:",
  "Istri kulo nyidam '{name}' saking lapak Anda. Tolong pilihkan label aksara ingkang leres:",
  "Mbah butuh '{name}' kagem ramuan jamu masuk angin. Pilihkan aksara jawanya nggih:",
  "Nuwun sewu, kulo utusan saking kraton badhe mundhut '{name}'. Manakah aksara jawanya?",
  "Wahai kanca, wonten '{name}' kagem pelengkap hidangan malam? Tolong berikan kemasan aksara:",
  "Sore juragan, kulo badhe nyoba masak mawi '{name}'. Manakah bungkusan serat jawanya?",
  "Halo! Kulo rumaos kepincut kalih '{name}' ing mriki. Tolong ambilkan botol mawi aksara:",
  "Wonten '{name}' kagem pakan ternak kulo juragan? Tolong tunjukkan bungkus aksara:",
  "Sugeng enjang, kulo badhe mundhut '{name}' kagem hantaran besanan. Label aksaranya pundi?",
  "Simbah kakung pados '{name}' kagem wedangan sore niki. Pundi bungkusan aksaranipun?",
  "Kulanuwun, argo '{name}' pinten nggih? Tolong arahkan kulo ke bungkusan aksara:",
  "Nuwun sewu, kulo mbetahaken sanget '{name}' kagem hajatan desa. Pundi aksaranya ingkang pas?",
  "Sugeng enjang, kulo madosi '{name}' saking wau bengi. Pundi aksarane?",
  "Madosi '{name}' kagem acara selamatan niki juragan. Tolong carikan aksaranya.",
  "Wahai sedulur bakul, '{name}' tasih wonten tha? Pundi kemasan mawi aksaranya?",
  "Permisi, numpang tumbas '{name}' setunggal, kagem keluarga. Aksara jawanya sing pas pundi?",
  "Slamet sore, kulo butuh '{name}' dadakan niki. Pundi bungkusan aksarane?",
  "Juragan, kulo ngidam '{name}' banget. Tolong pados aksara jawane nggih.",
  "Kulanuwun, Mbah kakung nitip tumbas '{name}'. Tunjukan label aksarane nggih.",
  "Pados '{name}' kagem sesajen rutin niki. Tolong pilih aksaranya.",
  "Bade borong '{name}' kagem didol malih. Pundi wadhah aksara jawane?",
  "Halo, kepareng tumbas '{name}' sethithik mawon. Aksarane pundi?",
  "Sugeng siang, ibu butuh '{name}' niki. Aksarane sing leres napa nggih?",
  "Mas, pados '{name}' ingkang tasih seger. Tolong tunjuk aksara jawane.",
  "Pados '{name}' kualitas sing apik dewe. Pundi bungkusan mawi aksarane?",
  "Kepareng tumbas '{name}' niki? Tolong wenehi aksara jawane.",
  "Wonten stok '{name}' saiki? Kulo badhe numbasi sing bungkusan mawi aksarane.",
  "Kulanuwun, pados '{name}' ingkang mirah regane. Aksara jawane nopo nggih?",
  "Nuwun sewu, '{name}' ingkang panjenengan sade pundi aksara jawane?",
  "Slamet ndalu, budhe kepengin '{name}'. Pilihkan aksara jawane.",
  "Madosi '{name}' kagem bahan adonan geden. Tunjukan aksarane nggih."
];

const PENJUAL_TEMPLATES_L2 = [
  "Nuwun sewu juragan, kulo pados barang sing tulisan aksarané '{javaneseScript}'. Menika nopo nggih?",
  "Kulo mbetahaken barang kanthi label '{javaneseScript}' kagem obat tradisional. Nopo niku?",
  "Simbah putri paring wekasan supados tumbas bungkusan mawi serat '{javaneseScript}'. Nopo nggih asmane?",
  "Juragan, kulo nemu bungkusan mawi label '{javaneseScript}' niki wonten laci. Isinya apa nggih?",
  "Kulanuwun, kepengen borong bungkusan kanthi aksara '{javaneseScript}' niki. Ini barang apa?",
  "Nuwun sewu, kulo diutus tumbas bungkusan beraksara '{javaneseScript}'. Nopo nggih niki?",
  "Sugeng siang, punopo wonten stok kagem bungkusan mawi serat '{javaneseScript}'? Nopo niku?",
  "Tolong pilihkan barang mawi serat kuno '{javaneseScript}'. Apakah itu namanya?",
  "Simbah putri saking desa pados bungkusan mawi lambang '{javaneseScript}'. Nopo nggih asline?",
  "Kulo kepencet milih bungkusan kanthi gambar aksara '{javaneseScript}'. Menika nopo juragan?",
  "Hei bakul loman! Bungkusan mawi serat '{javaneseScript}' iki regane pinten? Lan nopo asmane?",
  "Wahai juragan, kulo nemu bungkusan berlabel '{javaneseScript}'. Tolong terjemahkan namanya nggih:",
  "Simbah paring serat aksara '{javaneseScript}' niki kagem ditukarkan barang. Menika barang nopo?",
  "Sugeng enjang, bade mundhut barang sing mawi tulisan '{javaneseScript}'. Nopo asmanipun?",
  "Kulanuwun, pados bungkusan mawi lambang aksara '{javaneseScript}'. Nopo asmanipun nggih?",
  "Nuwun sewu juragan yang ramah, bungkusan '{javaneseScript}' niki namane menopo?",
  "Kulo badhe tumbas bungkusan kanthi tulisan '{javaneseScript}' kagem obat simbah. Nopo niku?",
  "Tolong carikan bungkusan mawi serat aksara '{javaneseScript}' nggih. Apa nama jawanya?",
  "Ealah, simbah lali jeneng barange, mung kelingan serat aksarane: '{javaneseScript}'. Nopo niku?",
  "Bungkusan mawi label '{javaneseScript}' niki bumbu pawon nopo nggih? Kulo kesupen jeneng latine.",
  "Sugeng siang bakul! Tolong ambilkan bungkusan berlabel '{javaneseScript}'. Ini apa namanya?",
  "Kulo pados bungkusan beraksara '{javaneseScript}' kagem besanan sore niki. Barang menika nopo?",
  "Nuwun sewu, wonten bungkusan bertuliskan aksara '{javaneseScript}'? Menika nopo nggih?",
  "Sore juragan, kulo penasaran kalih serat aksara '{javaneseScript}' niki. Ini isi barang apa nggih?",
  "Juragan, Ibu kulo mundhut barang mawi tulisan '{javaneseScript}'. Jeneng barange nopo?",
  "Halo juragan mudo, kulo badhe tumbas bungkusan '{javaneseScript}'. Menika nopo nggih?",
  "Permisi, kulo pados barang mawi serat Jawi asli '{javaneseScript}'. Namanya dalam bahasa apa?",
  "Simbah buyut kesupen nama bumbu pawon '{javaneseScript}' niki. Nopo nggih asmanipun?",
  "Kulanuwun, kulo badhe nyobi tumbas barang mawi label '{javaneseScript}'. Nopo nggih niki?",
  "Bakul, kulo pados barang sing tinulis mawi sandhangan '{javaneseScript}'. Menika nopo asmane?",
  "Kulo penasaran '{javaneseScript}' niki asline barang napa ingkang didol?",
  "Bungkusan mawi tulisan '{javaneseScript}' niki asline isine dodolan apa nggih?",
  "Ada pesanan berlabel '{javaneseScript}'. Napa niki jenenge ing kene?",
  "Simbah nulis '{javaneseScript}' teng kertas pesenan. Iki asmane napa mas?",
  "Nuwun sewu, '{javaneseScript}' iku dituduhake kagem barang napa nggih?",
  "Kulo mbetahaken barang kanthi tulisan layang '{javaneseScript}'. Menapa niku asline?",
  "Bungkusan anyar beraksara '{javaneseScript}' niki isine napa nggih nyuwun sewu?",
  "Tulisan '{javaneseScript}' niki nuduhake barang apa ta juragan bakul?",
  "Kulo manggih catetan '{javaneseScript}'. Niku namane dodolan napa nggih?",
  "Mas bakul, '{javaneseScript}' niki asline njurus ten barang napa?",
  "Wadah tulisan '{javaneseScript}' niki jenenge napa ing bahasa pandinan?",
  "Slamet siang, '{javaneseScript}' kuwi jenenge nopo mbake/mase?",
  "Kepareng tanglet jenenge barang mawi aksara '{javaneseScript}' niki napa.",
  "Pinten regane barang '{javaneseScript}' niki? Namine menapa ta?",
  "Kulo kelingan ana pesenan '{javaneseScript}'. Niku napa ta asmane barange?",
  "Madosi bungkusan bertulis '{javaneseScript}' kagem bapak. Niku napa ta mas?",
  "Pungkasan tumbas '{javaneseScript}' niki nyuwun pirso, napa isine yata?",
  "Bojoku numbasne kelawan jeneng '{javaneseScript}', tapi kulo mboten ngerti niku napa asmane.",
  "Milih barang sek tulisane '{javaneseScript}' niki asline barang napa ta niku?",
  "Nuwun sewu, tulisan '{javaneseScript}' itu bacakan latinnya napa nggih mas/mbak?"
];

const PENJUAL_TEMPLATES_L3 = [
  "Kulanuwun juragan, kulo badhe membeli '{name}'. Bisakah Anda merakit aksara '{javaneseName}' kagem bungkusan niki?",
  "Wahai juragan lapak yang bijaksana, kulo butuh '{name}'. Rakitlah papan sandangan kagem '{javaneseName}':",
  "Bantu kulo mengeja aksara kagem bungkusan '{name}' '{javaneseName}' supados mboten klintu di jalan nggih:",
  "Kulo badhe mundhut '{name}' kagem oleh-oleh, tolong susun huruf sandhangan '{javaneseName}' nggih:",
  "Halo juragan, Ibu butuh '{name}' kagem kenduri. Tolong eja serat jawanya '{javaneseName}' di laci papan:",
  "Sugeng ndalu, wonten '{name}'? Tolong rakit aksara jawa untuk '{javaneseName}' di nampan:",
  "Kulo badhe masak jamu mawi '{name}'. Eja serat aksaranya '{javaneseName}' nggih juragan:",
  "Hajatan besar desa mbetahaken '{name}'. Bisakah Anda menyusun kata '{javaneseName}' mawi aksara?",
  "Juragan, tolong siapkan '{name}' dan susun ejaan '{javaneseName}' kagem label bungkusan:",
  "Halo! Kulo badhe borong '{name}'. Tolong susun aksara sandhangannya kagem kata '{javaneseName}':",
  "Sugeng enjang! Tolong ambilkan '{name}' dan eja huruf aksara kagem '{javaneseName}':",
  "Wahai kanca, kulo pados '{name}'. Coba eja serat kata '{javaneseName}' memakai kayu laci nggih:",
  "Simbah paring dhuwit kagem mundhut '{name}'. Cobalah rakit kata '{javaneseName}' mawi aksara Jawi:",
  "Kulo saking Sleman pados '{name}'. Tolong susun abjad aksara kagem '{javaneseName}' nggih:",
  "Kulanuwun, badhe borong '{name}' niki. Cobalah susun tulisan aksara kagem kata '{javaneseName}':",
  "Nuwun sewu, kustom kulo pados '{name}' seger. Tolong eja serat katane '{javaneseName}' nggih:",
  "Juragan, kulo badhe masak mbetahaken '{name}'. Susunlah tatanan aksara kagem '{javaneseName}':",
  "Sugeng enjang, kulo diutus Mbah Lurah tumbas '{name}'. Tolong rakit tulisan aksara '{javaneseName}':",
  "Bakul loman, kulo badhe tumbas '{name}'. Eja serat jawanya kagem kata '{javaneseName}' nggih:",
  "Istri kulo nyidam '{name}'. Coba rakit aksara jawanya kagem kata '{javaneseName}' berpola:",
  "Mbah mbetahaken '{name}' kagem ramuan tradisonal. Eja serat aksara '{javaneseName}' nggih:",
  "Nuwun sewu, kulo utusan kraton badhe mundhut '{name}'. Tolong susun kata kuno '{javaneseName}':",
  "Wahai juragan, wonten '{name}' kagem pelengkap makan malam? Eja serat jawanya '{javaneseName}':",
  "Sore juragan, kulo badhe masak soto mawi '{name}'. Tulung susun sandhangan kagem '{javaneseName}':",
  "Halo! Kulo kepincut kalih '{name}' ing mriki. Tolong eja kata sandhangannya '{javaneseName}':",
  "Wonten '{name}' kagem pakan ternak kulo juragan? Eja serat aksaranya '{javaneseName}' n-g-g-i-h:",
  "Sugeng enjang, kulo badhe mundhut '{name}' kagem besanan. Tolong susun aksara kagem '{javaneseName}':",
  "Simbah kakung pados '{name}' sore niki. Tolong rakit kata aksara jawanya kagem '{javaneseName}':",
  "Kulanuwun, bunderan '{name}' pinten nggih? Tolong eja serat aksaranya kagem '{javaneseName}':",
  "Nuwun sewu, kulo mbetahaken '{name}' kagem sesaji desa. Tolong susun aksara '{javaneseName}':",
  "Simbah badhe masak '{name}'. Cobi rakit aksara kagem '{javaneseName}' supados bener nggih:",
  "Kanca kulo nitip numbas '{name}'. Tolong susun aksara jawane kagem '{javaneseName}':",
  "Nuwun sewu, kulo mados '{name}' kagem selamatan, rakitna aksara '{javaneseName}' niki:",
  "Tolong bungkus '{name}' kagem kulo juragan. Susun aksarane '{javaneseName}' ing papan nggih:",
  "Sore mas, ada pesanan '{name}' niki. Eja aksara '{javaneseName}' meniko supados mboten klintu:",
  "Sugeng enjang, bade borong '{name}' dinten niki. Tolong klethek huruf '{javaneseName}' siji-siji:",
  "Kulo butuh '{name}' cepet-cepet! Susun aksara '{javaneseName}' saiki uga kagem kulo:",
  "Bisa gawekake bungkusan '{name}' untuk saya? Tolong rangkai huruf '{javaneseName}' niki nggih:",
  "Mas/Mbak minta '{name}' sing akeh nggih. Ejaane '{javaneseName}' niku pripun susunane?",
  "Pengen tumbas '{name}', tapi syaratnya saya harus eja '{javaneseName}':",
  "Tolong siapkan '{name}' segera, kalih ngerakit aksarane '{javaneseName}' niki:",
  "Nuwun sewu mados '{name}' kagem keluarga ageng. Susun kata '{javaneseName}' monggo kulo antosi:",
  "Mas, pados tumbas '{name}' kagem sedulur kulo. Eja '{javaneseName}' kanthi patitis nggih:",
  "Sedulur kulo nyuwun '{name}', tolong asusun aksara '{javaneseName}' teng rigen kayu:",
  "Menawi mundhut '{name}' kudu ngeja '{javaneseName}'? Sumangga kulo coba ngerakit:",
  "Wah, kulo kudu tuku '{name}' sak menika. Eja aksara jawane '{javaneseName}' monggo:",
  "Bapak utusan numbas '{name}' nggih. Tolong carikan lajeng rakit aksara '{javaneseName}':",
  "Mbak/Mas, kulo pesen '{name}' satu bungkus wutuh. Mangga rakit '{javaneseName}':",
  "Yen ajeng '{name}' saking kene juragan, ejaane '{javaneseName}' niku sing endi bae urutane?",
  "Tolong siapake '{name}' kagem suguhan wengi, lan susun aksarane '{javaneseName}':"
];

const PEMBELI_TEMPLATES_L1 = [
  "Sugeng rawuh! Kulo gadhah '{name}' seger nembe panen saking kebon. Mangga pilih bungkusan mawi aksara Jawi ingkang leres:",
  "Sumangga pados '{name}' kualitas super saking Sleman. Pilih wadah kanthi serat aksara jawanya ingkang jumbuhi:",
  "Slamet rawuh nggih! Gamelan pasar nembe muni, niki wonten '{name}' pilihan. Pundi wadhah aksaranipun?",
  "Sugeng siang kanca mudo! Mundhut '{name}' kagem oleh-oleh kulawarga? Mangga pilih aksara jawanya:",
  "Ealah, nderek langkung nggih! Niki lapak '{name}' paling seger lan murah. Pundi wadah berlabel aksara jawanya?",
  "Sugeng sore! Kulo nembe mbukak peti '{name}' anyar saking laci Solo. Pilih piring mawi label aksara:",
  "Monggo pados nopo den bagus? Niki wonten '{name}' pilihan simbah. Manakah label aksaranya?",
  "Lapak kulo gadhah '{name}' wangi nan mantap. Coba pilih bungkusan mawi serat aksara niki nggih:",
  "Sugeng enjang juragan mudo! Mundhut '{name}' kagem bumbu soto? Piring mawi aksara pundi ingkang cocog?",
  "Sumangga, niki grosir '{name}' termurah sak-pasar Jawi. Pilih wadah kanthi label aksara:",
  "Sugeng rawuh! '{name}' niki taksih anget dipanen injih. Cobi padosi bungkusan mawi label:",
  "Lapak kulo mligi nyawisaken '{name}' kualitas kraton. Pundi kemasan mawi serat aksara jawanya?",
  "Slamet siang! Golek '{name}' kagem obat kesarasan nopo? Pilih bungkusan mawi aksara jawanya:",
  "Sumangga dipun pirsani den ayu, niki lapak '{name}' terlengkap. Pundi wadah mawi tulisan:",
  "Sugeng sore! Keranjang '{name}' niki nembe teko saking Gunung Kelud. Pilih lemari mawi label:",
  "Monggo-monggo, pancen ayu '{name}' niki seger sanget. Pundi bungkusan aksara Jawi ingkang trep?",
  "Sugeng rawuh injih! '{name}' niki kualitas ekspor mancanegara. Tunjuk kemasan aksara jawanya:",
  "Ealah, grosir '{name}' asli saking desa Kendal niki mantep. Pundi bungkusan mawi label aksara Jawi?",
  "Selamat belanja! lapak kulo nyedhiyakake '{name}' paling wangi. Pilih bungkusan mawi serat:",
  "Sugeng ndalu nggih! Mundhut '{name}' kagem anget-anget wedangan? Pundi label aksara jawanya?",
  "Monggo pados sandhangan '{name}' sing leres? Niki bungkusan mawi label serat aksara pundi?",
  "Sugeng rawuh den bagus den ayu! Niki wonten '{name}' saking lereng merapi. Pilih piring mawi aksara:",
  "Ealah den, badhe mundhut '{name}' kagem oleh-oleh? Sumangga pilih botol mawi serat aksara:",
  "Slamet enjang! '{name}' niki gadhah khasiyat linuwih kagem awak seger. Pundi bungkusan aksarane?",
  "Sumangga pinilih den, '{name}' niki tasih murni saking bumbung pring. Pilih aksara jawanya nggih:",
  "Sugeng siang! '{name}' seger nembe teka saking Sleman Kulon. Pundi kemasan mawi serat jawane?",
  "Monggo pados '{name}' kagem bumbu pawon tradisonal? Pundi bungkusan mawi serat jawanya?",
  "Slamet sore nggih! Keranjang '{name}' niki murah tur seger tenan. Pundi wadah sertifikat aksara jawanya?",
  "Sugeng rawuh! Ada '{name}' khusus panenan sepuh saking lereng kelud. Pundi label aksara jawane?",
  "Ealah, sumangga dipun mundhut '{name}' seger niki. Pundi bungkusan mawi labele nggih den?",
  "Slamet siang! Wonten '{name}' anyaran sing siap diangkut. Pundi aksarane?",
  "Halo, saya penjual grosir! Sedia '{name}' miring regane. Pilih bungkus aksara jawane:",
  "Sugeng rawuh! Kulo gadah '{name}' paling mak nyuss sak kuthagede. Aksarane ingkang pundi?",
  "Ayo diborong-diborong '{name}'-e! Pilih bungkusan sing tulisane aksara jawa iki:",
  "Sore! Nembe bongkar muat '{name}'. Monggo dipilih mawon aksarane:",
  "Monggo mampir! Nyediakake '{name}' kualitas sultan harga kerakyatan. Aksarane napa?",
  "Permisi, badhe nampilake '{name}' pilihan simbah kulo. Tunjuk bungkusan aksaranya:",
  "Ayo gek ndang diangkut '{name}' iki mumpung seger. Pundi label aksarane?",
  "Nuwun sewu, iki bakulan '{name}' the best in town. Pilih kotak sing mawi aksara:",
  "Slamet isuk! Stok '{name}' tasih komplit lur. Aksara jawane nggih monggo dipilih:",
  "Sugeng siang ndoro! Niki lapak '{name}' langganane juragan sedaya. Pundi aksarane?",
  "Ayo-ayo mreneo, blanja '{name}' paling mantep kene nggone. Pilih kemasan aksarane:",
  "Slamet ndalu! Walau peteng panenan '{name}' tasih suminar. Pilih aksarane yuk:",
  "Monggo lur, mborong '{name}' saking kebon dewe. Pundi label beraksara jawane?",
  "Sugeng enjang, nawarna '{name}' kualitas jempolan. Pilih bungkusan mawi aksara:",
  "Hap hap! '{name}' tasih apik rupane. Pilih kotak dengan aksara jawanya:",
  "Permisi, kulo nawakne '{name}' spesial diskon. Label aksaranya sebelah pundi?",
  "Nuwun sewu kisanak, lapak kulo komplit ana '{name}'. Tunjuk label aksarane:",
  "Mrene mas mba, tuku '{name}' jaminan puas. Pilih aksarane nggih:",
  "Sugeng sore! Lapak '{name}' buka teras. Pundi kemasan mawi serat jawane?"
];

const PEMBELI_TEMPLATES_L2 = [
  "Kulo nembe mawon bungkus barang niki mawi serat Jawi '{javaneseScript}'. Mangga, nopo asmane barang niki?",
  "Ealah, label niki seratipun '{javaneseScript}'. Cobi tebak, isinipun nopo nggih den bagus?",
  "Niki wonten bungkusan kuno mawi serat '{javaneseScript}'. Saged tebak meniko nopo isine?",
  "Sugeng rawuh! Bungkusan mawi serat aksara '{javaneseScript}' niki taksih seger sanget. Menika nopo nggih?",
  "Sumangga, piring mawi label '{javaneseScript}' niki obat tradisional Jawi paling ampuh. Menika nopo asmane?",
  "Slamet siang den! Guci mawi label '{javaneseScript}' niki madu asli rimba jati. Menika barang nopo?",
  "Nuwun sewu, bungkusan anyar mawi lambang '{javaneseScript}' niki bumbu masak. Jeneng jawane nopo?",
  "Monggo, kulo nembe mendhet bungkusan aksara '{javaneseScript}' saking laci. Saged tebak nopo niki?",
  "Ealah juragan mudo, kothak mawi labele serat '{javaneseScript}' niki regane murah sanget. Isine nopo?",
  "Slamet sore den ayu! Tempayan berlabel '{javaneseScript}' niki wangi sanget. Menika asmane nopo?",
  "Sugeng rawuh! Wadah mawi serat kuno '{javaneseScript}' niki dipanen saking Sleman. Jenenge nopo?",
  "Sumangga, keranjang mawi lambang aksara '{javaneseScript}' niki kesukaan lurah. Nopo asmane?",
  "Monggo mundhut nopo den? Piring mawi serat '{javaneseScript}' niki barang nopo nggih?",
  "Sugeng siang den, kothak anyar mawi label '{javaneseScript}' niki bumbu dapur lho. Namanya apa?",
  "Ealah, kulo supe nama bungkusan beraksara '{javaneseScript}' niki. Saged bantu tebak namanya?",
  "Slamet rawuh den! Keranjang mawi tanda aksara '{javaneseScript}' niki manis sanget. Menika nopo?",
  "Monggo dipun pirsani den, tempayan serat '{javaneseScript}' niki seger nembe panen. Nopo asmane?",
  "Sugeng ndalu, kemasan mawi lambang aksara '{javaneseScript}' niki isinya apa nggih?",
  "Ealah bakul lali nama barang mawi label '{javaneseScript}' niki, menika nopo nggih den bagus?",
  "Lapak kulo mligi nyawisaken bungkusan '{javaneseScript}' seger khusus dinten niki. Nopo asmane?",
  "Sugeng enjang! Piring mawi tanda aksara '{javaneseScript}' niki panenan pungkasan sore wingi. Isine nopo?",
  "Sumangga den, guci bertuliskan aksara '{javaneseScript}' niki berkhasiyat linuwih. Menika barang nopo?",
  "Monggo, bungkusan mawi lambang sandhangan '{javaneseScript}' niki regane murah tenan. Jeneng jawane nopo?",
  "Slamet enjang, kothak mawi label '{javaneseScript}' niki isine nopo nggih den bagus?",
  "Ealah, bungkusan aksara '{javaneseScript}' niki bumbune soto mrantasi. Menika asmane nopo?",
  "Sugeng siang! Keranjang mawi serat sandhangan '{javaneseScript}' niki manis legit. Menika nopo?",
  "Monggo mundhut den mudo, tempayan mawi label '{javaneseScript}' niki isinya apa?",
  "Slamet sore! Wadah kuno tinulis serat '{javaneseScript}' niki barang berharga. Nopo asmanipun?",
  "Sugeng rawuh! Bungkusan mawi tanda serat '{javaneseScript}' niki pancen nggemsemake sanget. Nopo niki?",
  "Ealah, bungkusan mawi lambang Jawi '{javaneseScript}' niki asmane nopo nggih den ayu?",
  "Barang berlabel '{javaneseScript}' iki nembe laku keras. Napa jeneng jawane?",
  "Lha dalah, wadhah '{javaneseScript}' dadi primadona dina iki. Asmane napa niku?",
  "Ayo ditebak! Wadah aksara '{javaneseScript}' iki isine dodolan apa hayo?",
  "Bungkusan mawi serat kuno '{javaneseScript}' iki regane diskon lho. Napa asmane?",
  "Kulakanku mawi aksara '{javaneseScript}' dilarisi mbah-mbah. Menapa jenenge?",
  "Tulisan '{javaneseScript}' niki kerep digoleki wargo. Apa iki sebutane?",
  "Sapa gelem barang '{javaneseScript}' asli saking desa kene? Namanya apa hayo?",
  "Lapak kulo ana sisa barang '{javaneseScript}' siji tok. Iku apaan ya?",
  "Tolong tebak, kemasan bertuliskan '{javaneseScript}' iki barang napa mas/mbake?",
  "Aksara '{javaneseScript}' biasane kanggo nulis dodolan napa ta niki?",
  "Barang kotak mawi '{javaneseScript}' paling akeh penggemare. Menapa asmane?",
  "Sugeng siyang, wadhah '{javaneseScript}' ini laris manis, isinya apa?",
  "Bungkusan sandhangan '{javaneseScript}' tasih seger. Apa jenenge?",
  "Wonten pirang kothak '{javaneseScript}' kiwa wingking. Menika asmane napa?",
  "Kulo nembe ngedol barang berlabel '{javaneseScript}'. Napa niku nggih?",
  "Permisi, barang mawi serat '{javaneseScript}' iki apik tur bermanfaat. Apa itu?",
  "Slamet isuk! Tulisan '{javaneseScript}' dilarisi priyayi. Iku asmane apa?",
  "Ayo tebak label '{javaneseScript}' sadurung kulo dol! Apa jenenge barang iki?",
  "Nuwun sewu, peti '{javaneseScript}' isine napa nggih lali aku minangka bakul?",
  "Lapakku nyediani '{javaneseScript}' sing paling the best. Napa niku namine?"
];

const PEMBELI_TEMPLATES_L3 = [
  "Yen sampeyan badhe mundhut '{name}', tulung eja serat aksaranipun sing trep nggih kersane pas!",
  "Bumbu niki asmane '{javaneseName}'. Sumangga dipun eja aksaranipun ing rak kayu kagem bungkus:",
  "Kulo badhe maringi diskon kagem '{name}' menawi sampeyan saged nyusun serat aksara '{javaneseName}':",
  "Sugeng rawuh! badhe mundhut '{name}'? Mangga rakit serat jawanya '{javaneseName}' kersane mantep:",
  "Sumangga den bagus, rigen bumbu '{name}' niki dipaking mawi ejaan aksara Jawi '{javaneseName}':",
  "Monggo pados '{name}' seger panenan Sleman niki? Mangga rakit serat '{javaneseName}' nggih:",
  "Slamet siang den! Mundhut '{name}' kagem bumbu pawon? Coba eja serat jawane '{javaneseName}':",
  "Lapak kulo kagungan '{name}' paling wangi sak-Kendal. Eja aksaranya '{javaneseName}' nggih:",
  "Sugeng sore! Mundhut '{name}' seger niki den? Sumangga eja sandhangane '{javaneseName}' ing laci:",
  "Ealah, mundhut '{name}' kagem oleh-oleh? Rakit aksara Jawi kagem kata '{javaneseName}' nggih:",
  "Sugeng enjang! Mundhut '{name}' kualitas kraton niki den? Eja serat jawane kagem '{javaneseName}':",
  "Sumangga mundhut '{name}' seger nembe metik. Rakitlah serat jawanya kagem kata '{javaneseName}':",
  "Monggo dipun pendhet kanca mudo, niki '{name}' murah sanget. Eja aksara Jawi '{javaneseName}':",
  "Slamet siang, mundhut '{name}' kagem obat herbal simbah? Eja sandhangane kagem '{javaneseName}':",
  "Ibu nyuruh beli '{name}' nggih den? Coba rakit aksara Jawi kagem kata '{javaneseName}' ing laci:",
  "Sugeng rawuh! '{name}' niki manis legit panenan lereng merapi. Eja serat jawane '{javaneseName}':",
  "Sumangga mundhut '{name}' seger panenan kraton. Rakitlah serat jawanya kagem kata '{javaneseName}':",
  "Monggo mundhut nopo den bagus? Niki '{name}' seger. Tulung eja ejaan serat jawane '{javaneseName}':",
  "Slamet sore, '{name}' niki tasih murni saking hutan Kendal. Eja serat jawane kagem '{javaneseName}':",
  "Ealah den, badhe mundhut '{name}' kagem kelontong pawon? Rakit ejaan aksara Jawi kagem '{javaneseName}':",
  "Sugeng rawuh den mudo! mundhut '{name}' seger niki? Eja aksara mawi laci kagem kata '{javaneseName}':",
  "Monggo pados '{name}' pilihan simbah bupati niki. Coba susun serat lawas kagem '{javaneseName}':",
  "Slamet ndalu den! Mundhut '{name}' kagem wedangan sore? Eja serat sandhangan jawane '{javaneseName}':",
  "Sumangga mundhut '{name}' seger saking kebon pring Sleman. Eja aksara Jawi kagem '{javaneseName}':",
  "Monggo den, mundhut '{name}' kagem obat kesarasan? Rakitlah serat lawas kagem kata '{javaneseName}':",
  "Sugeng siang den ayu! Mundhut '{name}' panenan enjang niki? Eja sandhangane kagem '{javaneseName}':",
  "Slamet enjang, lapak kulo nyawisaken '{name}' murni. Eja serat aksara Jawi kagem '{javaneseName}':",
  "Ealah den bagus, badhe tumbas '{name}'? Mangga dipun rakit serat ejaane kagem kata '{javaneseName}':",
  "Sumangga dipun pirsani '{name}' kualitas super niki. Tolong rakit serat jawane '{javaneseName}':",
  "Sugeng rawuh! Mundhut '{name}' seger murah meriah sak-Kendal niki? Eja aksara jawane '{javaneseName}':",
  "Sedulur dodolan, tolong sampeyan rakitne aksara '{javaneseName}' kagem kemasan '{name}':",
  "Kulo kepareng sampeyan eja '{javaneseName}' sadurunge numbasi '{name}':",
  "Ayo rakit '{javaneseName}' sik, mengko tak wei diskon tumbas '{name}':",
  "Nulis '{javaneseName}' kagem kotak '{name}', piye urutane aksarane?",
  "Lapak kene mbetahne pitulung sampeyan, eja '{javaneseName}' nggo pesenan '{name}':",
  "Minta tolong tempelake '{javaneseName}' marang bungkusan '{name}' niki:",
  "Supados gampang ditemokake, rakit '{javaneseName}' ing dhuwur keranjang '{name}':",
  "Cobi diringkes '{javaneseName}' mawi aksara jawa ben '{name}' gampang didol:",
  "Nuwun sewu juragan, tolong bantu kulo eja '{javaneseName}' kagem ngelabeli '{name}':",
  "Kulo lali urutane '{javaneseName}', isa bantu ngrakit aksarane tak ijoli '{name}' setunggal?",
  "Mas/Mba tulung eja '{javaneseName}' ben isa diparking rapi bareng '{name}':",
  "Ayo eja huruf '{javaneseName}' ben pantes didol bebarengan karo '{name}':",
  "Ibu pesen '{name}', tapi njaluke di-eja mawi langgam '{javaneseName}'. Rakitaken nggih:",
  "Ealah label '{javaneseName}' ne copot kabeh, eja maneh gawa label kagem '{name}':",
  "Bungkusan '{name}' kulo kurangan label '{javaneseName}'. Tolong rampungake dhisik:",
  "Monggo-monggo di-eja '{javaneseName}' niki ben '{name}' gampil dipadosi:",
  "Rakit aksara '{javaneseName}' nggo bungkusan '{name}' spesial badhe pameran menika:",
  "Tolong urutne aksara '{javaneseName}' niki nggo dipasangi nyang kotak '{name}':",
  "Slamet enjang, ewangi aku ngemas '{name}' kalawan ngerakit ejaane '{javaneseName}':",
  "Aja nganti keliru, eja '{javaneseName}' ingkang trep kagem bungkusan '{name}':"
];

function formatTemplate(template: string, name: string, javaneseName: string, javaneseScript: string): string {
  return template
    .replace(/{name}/g, name)
    .replace(/{javaneseName}/g, javaneseName)
    .replace(/{javaneseScript}/g, javaneseScript);
}

export function generateRandomOrder(stallCategory: 'kelontong' | 'jamu' | 'buah', level: number, role: 'pembeli' | 'penjual' = 'penjual'): any {
  const possibleItems = MARKET_ITEMS.filter(it => it.category === stallCategory);
  const selectedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];

  const quantity = Math.floor(Math.random() * 3) + 1;
  const itemPrice = selectedItem.price * quantity;

  // Set the challenge type depending on level
  // Level 1: Match Javanese Word (Beginner)
  // Level 2: Multiple choice (Read full script name)
  // Level 3: Spell it out (Advanced spelling jigsaw)
  let questionType: 'match_word' | 'read_script' | 'spell_script' = 'match_word';
  if (level > 4) {
    const r = Math.random();
    questionType = r < 0.35 ? 'match_word' : r < 0.7 ? 'read_script' : 'spell_script';
  } else if (level > 2) {
    questionType = Math.random() < 0.6 ? 'match_word' : 'read_script';
  }

  const names = ['Kromo', 'Sastro', 'Jatmiko', 'Parijah', 'Siti', 'Endang', 'Suwarni', 'Bowo', 'Kartolo', 'Suatmadji'];
  const customerName = names[Math.floor(Math.random() * names.length)];
  const avatarSeed = `customer_${customerName.toLowerCase()}_${Math.floor(Math.random() * 100)}`;

  let dialogue = "";
  let correctAnswer = "";
  let options: string[] = [];

  const templateIndex = Math.floor(Math.random() * 30);

  if (questionType === 'match_word') {
    // Match Javanese Script: choose the correct full word in Javanese script for the given item
    correctAnswer = selectedItem.javaneseScript;
    
    if (role === 'penjual') {
      dialogue = formatTemplate(PENJUAL_TEMPLATES_L1[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    } else {
      dialogue = formatTemplate(PEMBELI_TEMPLATES_L1[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    }
    
    // Fill option fillers with other full items of this stall
    options = [correctAnswer, ...possibleItems.map(i => i.javaneseScript)].filter((v, i, self) => self.indexOf(v) === i);
    options = options.slice(0, 4).sort(() => Math.random() - 0.5);
    if (!options.includes(correctAnswer)) options[0] = correctAnswer;
    options = options.sort(() => Math.random() - 0.5);
  } else if (questionType === 'read_script') {
    // Intermediate: Read Javanese script, check transliteration
    correctAnswer = selectedItem.javaneseName;
    
    if (role === 'penjual') {
      dialogue = formatTemplate(PENJUAL_TEMPLATES_L2[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    } else {
      dialogue = formatTemplate(PEMBELI_TEMPLATES_L2[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    }
    
    options = [correctAnswer, ...possibleItems.map(i => i.javaneseName)].filter((v, i, self) => self.indexOf(v) === i);
    options = options.slice(0, 4).sort(() => Math.random() - 0.5);
    if (!options.includes(correctAnswer)) options[0] = correctAnswer;
    options = options.sort(() => Math.random() - 0.5);
  } else {
    // Spell script: drag letters together
    correctAnswer = selectedItem.javaneseScript;
    
    if (role === 'penjual') {
      dialogue = formatTemplate(PENJUAL_TEMPLATES_L3[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    } else {
      dialogue = formatTemplate(PEMBELI_TEMPLATES_L3[templateIndex], selectedItem.name, selectedItem.javaneseName, selectedItem.javaneseScript);
    }
    
    options = []; // used as puzzle chunks on client
  }

  return {
    id: Math.random().toString(36).substring(7),
    customerName,
    avatarSeed,
    dialogue,
    itemRequested: selectedItem,
    quantity,
    questionType,
    options,
    correctAnswer,
    bonusCoins: Math.ceil(itemPrice * 0.4)
  };
}
