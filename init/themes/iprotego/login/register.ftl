<#import "template.ftl" as layout>
<#import "register-commons.ftl" as registerCommons>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm','termsAccepted'); section>
    <#if section="header">
        ${msg("registerTitle")}
    <#elseif section="form">
        <form id="kc-register-form" action="${url.registrationAction}" method="post" class="w-full lg:w-2/3 flex flex-col gap-8 mt-16">
            <h1 class="font-bold text-3xl"> ${msg("registerTitle")} </h1>
            <div class="flex flex-col gap-6">
                <div class="flex gap-2 w-full">
                    <div class="flex flex-col gap-2 w-1/2">
                        <input
                            type="text"
                            placeholder="${msg('firstName')} *"
                            class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value="${(register.formData.firstName!'')}"
                            aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>" />
                        <#if messagesPerField.existsError('firstName')>
                            <span id="input-error-firstname" class="text-red-600" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                            </span>
                        </#if>
                    </div>
                    <div class="flex flex-col gap-2 w-1/2">
                        <input
                            type="text"
                            placeholder="${msg('lastName')} *"
                            class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            type="text"
                            id="lastName"
                            class="${properties.kcInputClass!}"
                            name="lastName"
                            value="${(register.formData.lastName!'')}"
                            aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>" />
                        <#if messagesPerField.existsError('lastName')>
                            <span id="input-error-lastname" class="text-red-600" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="${msg('email')} *"
                        class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        id="email"
                        class="${properties.kcInputClass!}"
                        name="email"
                        value="${(register.formData.email!'')}"
                        autocomplete="email"
                        aria-invalid="<#if messagesPerField.existsError('email')>true</#if>" />
                    <#if messagesPerField.existsError('email')>
                        <span id="input-error-email" class="text-red-600" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('email'))?no_esc}
                        </span>
                    </#if>
                </div>
                <#if !realm.registrationEmailAsUsername>
                    <div class="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="${msg('username')} *"
                            class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            id="username"
                            name="username"
                            value="${(register.formData.username!'')}"
                            autocomplete="username"
                            aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" />
                        <#if messagesPerField.existsError('username')>
                            <span id="input-error-username" class="text-red-600" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </#if>
                <#if passwordRequired??>
                    <div class="flex flex-col gap-2">
                        <input
                            type="password"
                            placeholder="${msg('password')} *"
                            class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            id="password"
                            name="password"
                            autocomplete="new-password"
                            aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" />
                        <#if messagesPerField.existsError('password')>
                            <span id="input-error-password" class="text-red-600" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password'))?no_esc}
                            </span>
                        </#if>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input
                            type="password"
                            placeholder="${msg('passwordConfirm')} *"
                            class="px-4 rounded text-md h-[3rem] border-[1px] border-[#0000006b] focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                            id="password-confirm"
                            name="password-confirm"
                            aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                        <#if messagesPerField.existsError('password-confirm')>
                            <span id="input-error-password-confirm" class="text-red-600" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </#if>
                <div>
                    <input tabindex="4" class="cursor-pointer h-12 bg-gray-900 hover:bg-black transition duration-150 ease-in-out rounded-full w-full text-white text-center" type="submit" value="Register" />
                </div>
                <a tabindex="6" class="text-sm font-light underline w-full text-center" href="${url.loginUrl}"> ${msg("registerLinkLabel")}</a>
                <#if realm.password && social.providers??>
                    <div class="flex items-center justify-center gap-4 w-full">
                        <div class="w-1/5 lg:w-2/6 h-[1px] bg-[#0000006b]"></div>
                        <div class="w-2/5 lg:w-2/6 flex items-center justify-center">
                            <a href=""> ${msg("registerAlternative")} </a>
                        </div>
                        <div class="w-1/5 lg:w-2/6 h-[1px] bg-[#0000006b]"></div>
                    </div>
                    <ul class="flex items-center justify-center gap-2">
                        <#list social.providers as p>
                            <li>
                                <a id="social-${p.alias}" class="h-12 w-12 hover:scale-105 transition duration-150 ease-in-out" <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>" type="button" href="${p.loginUrl}">
                                    <#if p.alias="facebook">
                                        <svg class="h-full w-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle
                                                cx="16"
                                                cy="16"
                                                r="14"
                                                fill="url(#paint0_linear_127_146)" />
                                            <path
                                                d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
                                                fill="white" />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_127_146"
                                                    x1="16"
                                                    y1="2"
                                                    x2="16"
                                                    y2="29.917"
                                                    gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#18ACFE" />
                                                    <stop offset="1" stop-color="#0163E0" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    <#elseif p.alias="google">
                                            <svg class="h-full w-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <rect
                                                    x="3"
                                                    y="2"
                                                    width="28"
                                                    height="28"
                                                    rx="6"
                                                    fill="white" />
                                                <rect width="32" height="32" fill="url(#pattern0)" />
                                                <defs>
                                                    <pattern
                                                        id="pattern0"
                                                        patternContentUnits="objectBoundingBox"
                                                        width="1"
                                                        height="1">
                                                        <use
                                                            xlink:href="#image0_127_143"
                                                            transform="scale(0.0104167)" />
                                                    </pattern>
                                                    <image
                                                        id="image0_127_143"
                                                        width="96"
                                                        height="96"
                                                        xlink:href="data:image/png;base64,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" />
                                                </defs>
                                            </svg>
                                    </#if>
                                </a>
                            </li>
                        </#list>
                    </ul>
                </#if>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>