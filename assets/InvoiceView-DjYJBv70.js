import{b5 as tt,b6 as et,s as ot,R as it,_ as at,a$ as nt,c,g as e,t as o,C as f,y as st,F as R,k as T,l as m,j as L,u as rt,q as dt,O as lt,a8 as ct,o as vt,d as gt,b3 as ht,b2 as ut,b7 as p,b8 as V,b9 as ft,m as mt,z as _t,M as pt,b as v}from"./index-Cfq8xc2Z.js";import{e as l}from"./sanitize-CqbYC6Qa.js";import"./purify.es-BGtG0CB9.js";const bt=s=>Array.isArray(s)?s:Object.entries(s||{}).map(([n,i])=>({key:n,value:i})),q={async getSettings(){return bt(await ot.getSettings())},async getOrder(s){if(!s)return null;try{return await tt(s)}catch{try{return(await et()).find(i=>i.id==s||i.order_number==s)||null}catch{return null}}}},E=s=>{if(!s)return!1;const n=String(s).toLowerCase();return n.includes("iris")||n.includes("t3jcwn2n2rvkxvcva")||n.includes("dobvpg934hatbpm5")||n.includes("yugdc4mk4vmsf6el")},xt=it("invoiceFeature",{state:()=>({order:null,loading:!0,siteLogo:"/brand/jabel-logo.png",siteName:"جبل | Jabel"}),actions:{async load(s){this.loading=!0;const[n,i]=await Promise.allSettled([q.getSettings(),q.getOrder(s)]);if(n.status==="fulfilled"){const t=n.value,g=t.find(r=>r.key==="logo"),h=t.find(r=>r.key==="site_name");g?.value&&!E(g.value)&&(this.siteLogo=String(g.value).startsWith("http")?g.value:`/storage/${g.value}`),h?.value&&!E(h.value)&&(this.siteName=h.value)}this.order=i.status==="fulfilled"?i.value:null,this.loading=!1}}}),yt={name:"InvoiceView",components:{PriceText:nt},setup(){const s=pt(),n=_t(),{t:i,locale:t}=rt(),{localized:g}=dt(),{currency:h}=lt(),r=xt(),{order:a,loading:b,siteLogo:A,siteName:C}=ct(r),M=mt(()=>V(a.value||{})),N=d=>i(`invoice.${d}`).replace("15%",`${ft(a.value||{})}%`),P=d=>{const u=ht(d,ut(a.value?.notes)),k=t.value==="ar"?"، ":", ";return u.map(S=>{const y=S.options.map(z=>`${z.group}: ${z.name}`).join(k);return u.length>1?`${y} (×${S.quantity})`:y})},D={pending:"status_pending",confirmed:"status_confirmed",paid_confirmed:"status_paid_confirmed",processing:"status_processing",shipped:"status_shipped",in_transit:"status_in_transit",shipping:"status_shipping",delivering:"status_shipping",in_delivery:"status_shipping",delivered:"status_delivered",completed:"status_delivered",cancelled:"status_cancelled",failed:"status_failed",returned:"status_returned",refunded:"status_refunded"},B=d=>{const u=D[String(d||"pending").toLowerCase()];return u?i(`invoice.${u}`):String(d||i("invoice.status_pending"))},O=d=>d==="cash_on_delivery"?i("invoice.payment_cod"):d||i("invoice.not_specified"),U=()=>{const d=t.value==="ar",u=d?"rtl":"ltr",k=d?"right":"left",S=d?"margin-right: auto;":"margin-left: auto;",y=l(a.value.orderNumber||a.value.order_number||a.value.id),z=l(a.value.date||new Date().toLocaleDateString(d?"ar-SA":"en-US")),H=l(O(a.value.payment_method)),J=l(B(a.value.status)),W=l(a.value.customerName||a.value.customer?.name||i("invoice.default_customer")),Y=l(a.value.customerPhone||a.value.customer?.phone||"-"),X=l(a.value.customerEmail||a.value.customer?.email||"-"),K=l(a.value.customerAddress||a.value.shipping_address||i("invoice.default_country")),_=l(h.value??h),G=p(a.value.subtotal||0,_),Q=p(a.value.tax||0,_),Z=p(a.value.total||a.value.total_amount||0,_),j=V(a.value),w=window.open("","_blank");w&&(w.opener=null,w.document.write(`
        <!DOCTYPE html>
        <html dir="${u}" lang="${d?"ar":"en"}">
        <head>
          <title>${i("invoice.tax_badge")} - ${y}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'IBM Plex Sans Arabic', Arial, sans-serif; direction: ${u}; text-align: ${k}; padding: 30px; background: #ffffff; color: #111827; }
            .badge-tax { display: inline-block; padding: 4px 10px; background: var(--color-brand-primary, #000000); color: #ffffff; font-size: 11px; font-weight: 700; border-radius: 4px; margin-bottom: 8px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000000; padding-bottom: 20px; margin-bottom: 24px; }
            .title { font-size: 24px; font-weight: 900; margin-bottom: 4px; }
            .subtitle { font-size: 13px; color: #6b7280; margin-bottom: 12px; }
            .tax-details p { font-size: 13px; color: #374151; margin-bottom: 4px; }
            .logo-area { text-align: end; }
            .logo-title { font-size: 26px; font-weight: 900; letter-spacing: 2px; }
            .meta-banner { display: flex; justify-content: space-between; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; }
            .customer-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 24px; }
            .customer-title { font-size: 14px; font-weight: 800; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
            .customer-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th { background: var(--color-brand-primary, #000000); color: #ffffff; padding: 10px 12px; font-size: 13px; text-align: ${k}; }
            td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
            .totals { width: 340px; ${S} margin-bottom: 30px; }
            .total-row { display: flex; justify-content: space-between; padding: 8px 12px; background: #f9fafb; font-size: 13px; margin-bottom: 4px; border-radius: 4px; }
            .total-row.grand { background: var(--color-brand-primary, #000000); color: #ffffff; font-size: 15px; font-weight: 800; }
            .footer { text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 12px; color: #6b7280; }
            @media print { body { padding: 15px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <span class="badge-tax">${i("invoice.tax_badge")}</span>
              <h1 class="title">${i("invoice.company_name")}</h1>
              <div class="tax-details">
                <p><strong>${i("invoice.vat_id")}:</strong> 301204567800003</p>
                <p><strong>${i("invoice.cr")}:</strong> 1010654321</p>
                <p><strong>${i("invoice.address")}:</strong> ${i("invoice.company_address")}</p>
              </div>
            </div>
            <div class="logo-area">
              <div class="logo-title">JABEL</div>
              <div style="font-size: 11px; color: #6b7280; letter-spacing: 1px;">ITALIAN LUXURY APPLIANCES</div>
              <div style="margin-top: 10px; font-size: 11px; font-weight: 700; color: #059669;">${i("invoice.zatca_authority_approved")}</div>
            </div>
          </div>

          <div class="meta-banner">
            <div><strong>${i("invoice.invoice_number")}:</strong> #${y}</div>
            <div><strong>${i("invoice.issue_date")}:</strong> ${z}</div>
            <div><strong>${i("invoice.payment_method")}:</strong> ${H}</div>
            <div><strong>${i("invoice.order_status")}:</strong> ${J}</div>
          </div>

          <div class="customer-box">
            <div class="customer-title">${i("invoice.customer_details")}</div>
            <div class="customer-grid">
              <div><strong>${i("invoice.name")}:</strong> ${W}</div>
              <div><strong>${i("invoice.mobile")}:</strong> ${Y}</div>
              <div><strong>${i("invoice.email_short")}:</strong> ${X}</div>
              <div><strong>${i("invoice.address")}:</strong> ${K}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>${i("invoice.product")}</th>
                <th>${i("invoice.quantity")}</th>
                <th>${i("invoice.unit_price")}</th>
                <th>${N("vat_col")}</th>
                <th>${i("invoice.total_incl_vat_short")}</th>
              </tr>
            </thead>
            <tbody>
              ${(a.value.items||a.value.products||[]).map((x,I)=>`
                <tr>
                  <td>${I+1}</td>
                  <td>${l(g(x.product||x,"name"))}${P(x).map($=>`<div style="font-size: 11px; color: #4b5563;">${l($)}</div>`).join("")}</td>
                  <td style="text-align: center;">${l(x.quantity)}</td>
                  <td style="text-align: center;">${p(x.price||x.unit_price,_)}</td>
                  <td style="text-align: center;">${p(j[I]?.tax||0,_)}</td>
                  <td style="text-align: end; font-weight: bold;">${p(j[I]?.totalInclVat||0,_)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row"><span>${i("invoice.subtotal_excl_vat")}:</span><strong>${G}</strong></div>
            <div class="total-row"><span>${N("vat_15")}:</span><strong>${Q}</strong></div>
            ${a.value.shipping>0?`<div class="total-row"><span>${i("invoice.shipping_short")}:</span><strong>${p(a.value.shipping||0,_)}</strong></div>`:""}
            <div class="total-row grand"><span>${i("invoice.grand_total_due")}:</span><strong>${Z}</strong></div>
          </div>

          <div class="footer">
            <p>${i("invoice.print_footer")}</p>
          </div>
        </body>
        </html>
      `),w.document.close(),w.print())},F=()=>{n.back()};return vt(()=>{r.load(s.params.id)}),{lines:M,vatLabel:N,order:a,loading:b,siteLogo:A,siteName:C,currency:h,printInvoice:U,goBack:F,t:i,locale:t,localized:g,itemChoiceLines:P,formatOrderStatus:B,formatPaymentMethod:O}}},wt={class:"invoice-page"},kt={key:0,class:"loading-state"},St={key:1,class:"invoice-box"},zt={class:"invoice-header"},Lt={class:"header-info"},At={class:"invoice-badge-tax"},Ct={class:"invoice-title"},Nt={class:"tax-info-grid"},It={class:"tax-detail-item"},Pt={class:"tax-detail-item"},Bt={class:"tax-detail-item"},Ot={class:"logo-and-qr"},jt={class:"zatca-qr-box"},Rt={class:"zatca-label"},Tt={class:"invoice-meta-banner"},Vt={class:"meta-item"},qt={class:"meta-label"},Et={class:"meta-val font-mono"},Mt={class:"meta-item"},Dt={class:"meta-label"},Ut={class:"meta-val"},Ft={class:"meta-item"},Ht={class:"meta-label"},Jt={class:"meta-val"},Wt={class:"meta-item"},Yt={class:"meta-label"},Xt={class:"meta-val status-confirmed"},Kt={class:"invoice-customer"},Gt={class:"section-title"},Qt={class:"customer-info-grid"},Zt={class:"customer-info"},$t={class:"customer-info"},te={class:"customer-info"},ee={class:"customer-info"},oe={class:"invoice-table"},ie={class:"col-index"},ae={class:"prod-title-inv"},ne={class:"prod-warranty-inv"},se={class:"text-center font-bold"},re={class:"text-center"},de={class:"text-center"},le={class:"text-end font-bold"},ce={class:"invoice-totals"},ve={class:"total-row"},ge={class:"total-row"},he={key:0,class:"total-row"},ue={key:1,class:"total-row discount"},fe={class:"total-row grand-total"},me={class:"invoice-footer"},_e={class:"footer-thank"},pe={class:"footer-legal"},be={key:2,class:"error-state"},xe={key:3,class:"invoice-actions"};function ye(s,n,i,t,g,h){const r=gt("PriceText");return v(),c("div",wt,[t.loading?(v(),c("div",kt,[n[3]||(n[3]=e("div",{class:"spinner"},null,-1)),e("p",null,o(t.t("invoice.loading")),1)])):t.order?(v(),c("div",St,[e("div",zt,[e("div",Lt,[e("div",At,o(t.t("invoice.tax_badge")),1),e("h2",Ct,o(t.t("invoice.company_name")),1),e("div",Nt,[e("p",It,[e("strong",null,o(t.t("invoice.vat_id"))+":",1),n[4]||(n[4]=f()),n[5]||(n[5]=e("span",{class:"tax-mono"},"301204567800003",-1))]),e("p",Pt,[e("strong",null,o(t.t("invoice.cr"))+":",1),n[6]||(n[6]=f()),n[7]||(n[7]=e("span",{class:"tax-mono"},"1010654321",-1))]),e("p",Bt,[e("strong",null,o(t.t("invoice.address"))+":",1),f(" "+o(t.t("invoice.company_address")),1)])])]),e("div",Ot,[n[9]||(n[9]=e("div",{class:"brand-logo-area"},[e("h3",{class:"logo-text"},"JABEL"),e("span",{class:"logo-sub"},"ITALIAN LUXURY")],-1)),e("div",jt,[n[8]||(n[8]=st('<svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-84b6d17a><rect width="100" height="100" fill="#ffffff" data-v-84b6d17a></rect><rect x="5" y="5" width="28" height="28" fill="#000000" data-v-84b6d17a></rect><rect x="9" y="9" width="20" height="20" fill="#ffffff" data-v-84b6d17a></rect><rect x="13" y="13" width="12" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="67" y="5" width="28" height="28" fill="#000000" data-v-84b6d17a></rect><rect x="71" y="9" width="20" height="20" fill="#ffffff" data-v-84b6d17a></rect><rect x="75" y="13" width="12" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="5" y="67" width="28" height="28" fill="#000000" data-v-84b6d17a></rect><rect x="9" y="71" width="20" height="20" fill="#ffffff" data-v-84b6d17a></rect><rect x="13" y="75" width="12" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="8" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="52" y="8" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="20" width="6" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="52" y="22" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="8" y="40" width="12" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="25" y="40" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="40" width="8" height="8" fill="#000000" data-v-84b6d17a></rect><rect x="54" y="40" width="8" height="8" fill="#000000" data-v-84b6d17a></rect><rect x="68" y="40" width="12" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="86" y="40" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="8" y="52" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="20" y="52" width="6" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="54" width="8" height="8" fill="#000000" data-v-84b6d17a></rect><rect x="56" y="54" width="12" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="74" y="52" width="6" height="12" fill="#000000" data-v-84b6d17a></rect><rect x="86" y="52" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="68" width="6" height="14" fill="#000000" data-v-84b6d17a></rect><rect x="52" y="74" width="14" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="72" y="68" width="6" height="8" fill="#000000" data-v-84b6d17a></rect><rect x="84" y="68" width="8" height="8" fill="#000000" data-v-84b6d17a></rect><rect x="40" y="86" width="14" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="60" y="86" width="6" height="6" fill="#000000" data-v-84b6d17a></rect><rect x="74" y="82" width="16" height="10" fill="#000000" data-v-84b6d17a></rect></svg>',1)),e("span",Rt,o(t.t("invoice.zatca_approved")),1)])])]),e("div",Tt,[e("div",Vt,[e("span",qt,o(t.t("invoice.invoice_number"))+":",1),e("span",Et,"#"+o(t.order.orderNumber||t.order.order_number||t.order.id),1)]),e("div",Mt,[e("span",Dt,o(t.t("invoice.issue_date"))+":",1),e("span",Ut,o(t.order.date||new Date().toLocaleDateString(t.locale==="ar"?"ar-SA":"en-US")),1)]),e("div",Ft,[e("span",Ht,o(t.t("invoice.payment_method"))+":",1),e("span",Jt,o(t.order.payment_method?t.formatPaymentMethod(t.order.payment_method):t.t("invoice.default_payment")),1)]),e("div",Wt,[e("span",Yt,o(t.t("invoice.order_status"))+":",1),e("span",Xt,o(t.formatOrderStatus(t.order.status)),1)])]),e("div",Kt,[e("h4",Gt,o(t.t("invoice.customer_recipient")),1),e("div",Qt,[e("p",Zt,[e("strong",null,o(t.t("invoice.name"))+":",1),f(" "+o(t.order.customerName||t.order.customer?.name||t.t("invoice.default_customer")),1)]),e("p",$t,[e("strong",null,o(t.t("invoice.mobile"))+":",1),f(" "+o(t.order.customerPhone||t.order.customer?.phone||"-"),1)]),e("p",te,[e("strong",null,o(t.t("invoice.email"))+":",1),f(" "+o(t.order.customerEmail||t.order.customer?.email||"-"),1)]),e("p",ee,[e("strong",null,o(t.t("invoice.delivery_address"))+":",1),f(" "+o(t.order.customerAddress||t.order.shipping_address||t.t("invoice.default_country")),1)])])]),e("table",oe,[e("thead",null,[e("tr",null,[n[10]||(n[10]=e("th",null,"#",-1)),e("th",null,o(t.t("invoice.product_warranty")),1),e("th",null,o(t.t("invoice.quantity")),1),e("th",null,o(t.t("invoice.unit_price")),1),e("th",null,o(t.vatLabel("vat_col")),1),e("th",null,o(t.t("invoice.total_incl_vat")),1)])]),e("tbody",null,[(v(!0),c(R,null,T(t.order.items||t.order.products||[],(a,b)=>(v(),c("tr",{key:a.id||b},[e("td",ie,o(b+1),1),e("td",null,[e("div",ae,o(t.localized(a.product||a,"name")),1),(v(!0),c(R,null,T(t.itemChoiceLines(a),(A,C)=>(v(),c("span",{key:C,class:"prod-options-inv"},o(A),1))),128)),e("span",ne,o(t.t("invoice.warranty_two_years")),1)]),e("td",se,o(a.quantity),1),e("td",re,[m(r,{value:a.price||a.unit_price,currency:t.currency},null,8,["value","currency"])]),e("td",de,[m(r,{value:t.lines[b]?.tax||0,currency:t.currency},null,8,["value","currency"])]),e("td",le,[m(r,{value:t.lines[b]?.totalInclVat||0,currency:t.currency},null,8,["value","currency"])])]))),128))])]),e("div",ce,[e("div",ve,[e("span",null,o(t.t("invoice.subtotal_excl_vat"))+":",1),e("strong",null,[m(r,{value:t.order.subtotal||0,currency:t.currency},null,8,["value","currency"])])]),e("div",ge,[e("span",null,o(t.vatLabel("vat_15"))+":",1),e("strong",null,[m(r,{value:t.order.tax||0,currency:t.currency},null,8,["value","currency"])])]),t.order.shipping>0?(v(),c("div",he,[e("span",null,o(t.t("invoice.shipping_cost"))+":",1),e("strong",null,[m(r,{value:t.order.shipping||0,currency:t.currency},null,8,["value","currency"])])])):L("",!0),t.order.discount>0?(v(),c("div",ue,[e("span",null,o(t.t("invoice.discount"))+":",1),e("strong",null,[m(r,{value:t.order.discount||0,currency:t.currency,negative:""},null,8,["value","currency"])])])):L("",!0),e("div",fe,[e("span",null,o(t.t("invoice.grand_total_due"))+":",1),e("strong",null,[m(r,{value:t.order.total||t.order.total_amount||0,currency:t.currency},null,8,["value","currency"])])])]),e("div",me,[e("p",_e,o(t.t("invoice.footer_thanks")),1),e("p",pe,o(t.t("invoice.footer_legal")),1)])])):t.order?L("",!0):(v(),c("div",be,[e("p",null,o(t.t("invoice.not_found")),1),e("button",{class:"back-btn",onClick:n[0]||(n[0]=(...a)=>t.goBack&&t.goBack(...a))},o(t.t("common.back")),1)])),t.order&&!t.loading?(v(),c("div",xe,[e("button",{class:"print-btn",onClick:n[1]||(n[1]=(...a)=>t.printInvoice&&t.printInvoice(...a))},[n[11]||(n[11]=e("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[e("polyline",{points:"6 9 6 2 18 2 18 9"}),e("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),e("rect",{x:"6",y:"14",width:"12",height:"8"})],-1)),f(" "+o(t.t("invoice.print_tax_invoice")),1)]),e("button",{class:"back-btn",onClick:n[2]||(n[2]=(...a)=>t.goBack&&t.goBack(...a))},o(t.t("common.back")),1)])):L("",!0)])}const ze=at(yt,[["render",ye],["__scopeId","data-v-84b6d17a"]]);export{ze as default};
