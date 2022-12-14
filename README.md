# Notion Blog

# π λ°°ν¬

[λ°°ν¬ μ±](https://notion-blog-shongs27.vercel.app/)

# ν΄λ κ΅¬μ‘°

```sh
src
β
ββ assets  # μ΄λ―Έμ§ νμΌ(svg)μ μ»΄ν¬λνΈλ‘ μ¬μ©νκΈ° μν΄ λͺ¨μλμ ν΄λ
ββ hooks # μ¬λ¬ custom hookμ΄ λͺ¨μ¬μλ ν΄λ
ββ components  # μ»΄ν¬λνΈλ₯Ό λͺ¨μλμ ν΄λ
β     ββ layout  # layoutκ΅¬μ±μ μν μ»΄ν¬λνΈκ° μλ ν΄λ
β     ββ MainDoor # Homeνλ©΄ μ μμ νμνλ©° λΈλ‘κ·Έλ₯Ό μκ°νλ μ»΄ν¬λνΈ
β     ββ Loading # κ²μ μ λ‘λ©λ°λ₯Ό μν μ»΄ν¬λνΈ
β     ββ Posts # ν¬μ€νΈλ€μ Grid ννλ‘ λ³΄μ¬μ£Όλ μ»΄ν¬λνΈ
β     ββ Tags # PostListμ νκ·Έλ€
β     ββ PageNationContainer # Postμ νμ΄μ§λ€μ΄μμ μν μ»΄ν¬λνΈ
β     ββ PageNation # νμ΄μ§λ€μ΄μ μ»΄ν¬λνΈ
β     ββ PostDetail # ν¬μ€νΈ λ΄μ© νμ΄μ§λ₯Ό λ³΄μ¬μ£Όλ μμΈ μ»΄ν¬λνΈ
β     ββ MappedNotion # mapImageUrlμ΄ overrideλ notionRenderer
β     ββ TableofContents # ν¬μ€νΈ λ΄μ© νμ΄μ§μ λͺ©λ‘μ λ³΄μ¬μ£Όλ μ»΄ν¬λνΈ
β     ββ PostNav # ν¬μ€νΈ μμΈνλ©΄μμ λ€λ₯Έ ν¬μ€νΈλ‘ λμ΄κ°λ λ§ν¬
β
ββ pages # λΌμ°ν λ³λ‘ μ΄λκ°λ₯ν νμ΄μ§
β     ββ _app  # κ³΅ν΅ νμ΄μ§
β     ββ about  # μ΄λ ₯μ νμ΄μ§
β     ββ contact  # λ°©λͺλ‘ κΈ°λ₯μ νμ΄μ§
β     ββ index  # Home νλ©΄ νμ΄μ§
β     ββ search  # κ²μ νμ΄μ§
β     ββ works  # νλ‘μ νΈ λͺ¨μλμ νμ΄μ§
β
ββ stores  # λ¦¬λμ€ μ€μ μ μν slice, storeκ° μλ ν΄λ
ββ styles  # CSS κΈλ‘λ² μ€νμΌμ μν ν΄λ
ββ types  # Typescript μ μ νμΌ

```

# π κΈ°μ  μ€ν

- Typescript
- NextJS
- ReactJS
- Redux toolkit
- SCSS

# π κ΅¬ν λ΄μ©

## 1. [Notion API](https://developers.notion.com/reference/intro)

Notionμ CMSλ‘ μ΄μ©ν¨μΌλ‘μ λΈλ‘κ·Έ ν¬μ€νΈλ₯Ό κ΄λ¦¬

![image](https://user-images.githubusercontent.com/55541745/185651801-c957c76c-9ddb-46bf-a09b-7b1e7fd23355.png)

## 2. λ λλ§ μ΅μ ν

λ€μν λ λλ§ λ°©μμ μ¬μ©νμ¬ μ΅μ νλ λΈλ‘κ·Έλ₯Ό μ€κ³νμ΅λλ€

> ### SSR

κ²μ μ SSRμ ν΅ν΄ μλ²μμ κ²μ λ°μ΄ν°λ₯Ό λ°μμ λμ μΈ νμ΄μ§λ₯Ό λ§λ€μ΄μ μ κ³΅

> ### SSG

λμ μΈ λ³νκ° νμμλ μ μ μΈ ν¬μ€νΈ νμ΄μ§λ€μ SSGλ₯Ό ν΅ν΄ pre-renderingν νμ΄μ§λ₯Ό μ κ³΅λ°μ UX ν₯μμ κΎν©λλ€

> ### CSR

redux/toolkitμ μ΄μ©ν flux κ΅¬μ‘°μ μνκ΄λ¦¬λ₯Ό ν΅ν΄ CSRμ μ¬μ©ν©λλ€

<br />

## 3. UX ν₯μ

> ### μ΅μ νλ λ λλ§ λ°©μ

λ€μν λ λλ§ λ°©μ μ€, νμν κΈ°λ₯μ μ΅μ νλ λ λλ§ λ°©μμ μ μ©νμ¬ UXλ₯Ό ν₯μ νμ΅λλ€

> ### λ°μν μΉ λμμΈ

> νλΈλ¦Ώ, λͺ¨λ°μΌμμλ μ΄μ©ν  μ μκ² λμμΈνμΌλ©°, responsiveν μμ§μμ λ°λΌ UIμ κ΅¬μ±μ λ³κ²½νλ ν¨κ³Όλ₯Ό μ μ©νμ΅λλ€.

> ### κ΄μ¬μ¬λ³ νκ·Έ

λΈλ‘κ·Έ UXμμ μ€μν κ²μ κ΄μ¬μ¬λ³λ‘ ν¬μ€νΈλ₯Ό νμΈν  μ μλ κ²½νμ΄λΌκ³  νλ¨νμ¬ νκ·Έλ₯Ό ν΅ν΄ κ΄λ ¨μλ ν¬μ€νΈλ₯Ό μμ½κ² νμΈν  μ μλ κ²μ μ€μμνλ UIμλλ€

> ### Table of contents, κ²μκΈ°λ₯, λ‘λ©λ° λ±..

table of contents, κ²μκΈ°λ₯ λ±μ μ¬μ©νμ¬ ν¬μ€νΈ μΉνμ μΈ λΈλ‘κ·Έμ νΉμ±μ κ³ λ €νμ΅λλ€

<br/>

## 4. μ΅μ νλ₯Ό μν λΈλ ₯

> ### νμ€ν μ½λ μ μ©

κ°μ₯ νμν κΈ°λ³Έ μ»΄ν¬λνΈμ νμ€ν μ½λλ₯Ό μ μ©νμ¬ λ¨μΌ μ±μμ μ§ν₯νλ μ»΄ν¬λνΈλ₯Ό κ΅¬μ±νλ € λΈλ ₯νκ³ , μ§μμ μΈ κ΄λ¦¬κ° κ°λ₯ν©λλ€.

> ### Next/imageκ° μλ svg μ»΄ν¬λνΈ

publicμ ν΅ν next/imageμ μ μ μΈ μ΄λ―Έμ§ νμΌμ μ¬μ©νμ§ μκ³ , svgμ κ²½μ° μ»΄ν¬λνΈλ‘ κ΅¬μ±νμ¬ css fill μμ±λ±μΌλ‘ μμ λ‘­κ² μμ ν  μ μλλ‘ λ§λ€μμ΅λλ€.
[μ°Έμ‘°](https://github.com/shongs27/notion-blog/tree/main/src/assets)

> ### μμ€μ½λ μ©λ

1. ν¬μ€νΈμ νλ‘μ νΈμ λͺ©λ‘μ λ³΄μ¬μ£Όλ ν­λͺ©μ κ³΅ν΅νν PostList μ»΄ν¬λνΈλ‘ ν΅μΌ μμΌ μ¬νμ©μ± μλ μ»΄ν¬λνΈ μ¬μ©μ κ³ λ―Όνκ³ ,

2. lib λΌμ΄λΈλ¬λ¦¬λ₯Ό ν΅ν΄ μλ²μ¬μ΄λμμλ§ μ¬μ©λλ μ½λλ₯Ό λΆλ¦¬νμ¬ μ€κ³νμ¬ ν΄λΌμ΄μΈνΈμμ λΆνμν JSμ½λλ₯Ό λ‘λνμ§ μκ² νμ΅λλ€.

<br />

# πΈ κ΅¬ν κ²°κ³Ό

|                                                             ν¬μ€νΈ                                                             |                                                            νλ‘μ νΈ                                                            |                                                           κ²μ κΈ°λ₯                                                            |
| :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/55541745/185759747-8d2f38e3-7e1f-4ee6-96bd-b9e12d1249a5.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759762-082f6ced-ac31-44f2-83d1-76228bc000b3.gif" width="200"/> | <img src="https://user-images.githubusercontent.com/55541745/185759767-176466f9-6067-42ef-a5c7-ba6aece824e8.gif" width="200"/> |

<!-- ## μΆκ° ν  κ²

- shareμλλ¬λ react-notion-xκ° λ λλ§ ν  μ μκ²? (λΈλΌμ°μ μμ access user, token2)
- κ° νκ·Έ μ«μ κ΅¬νλ API
- seo
- λ‘λ©νλ©΄ λ‘λ© μ²«λ²μ§ΈλΆν°λ
- eslint, type μ λ¦¬
- νμ€νΈ μ½λ -->
