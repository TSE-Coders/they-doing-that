plugins {
    kotlin("jvm") version "1.9.21"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("org.eclipse.jetty:jetty-server:11.0.15")
    implementation("org.eclipse.jetty:jetty-servlet:11.0.15")
    implementation("jakarta.servlet:jakarta.servlet-api:5.0.0")
    implementation("com.microsoft.sqlserver:mssql-jdbc:12.4.0.jre11")
    implementation("org.slf4j:slf4j-api:2.0.7")
    implementation("org.slf4j:slf4j-simple:2.0.7")
    testImplementation("org.jetbrains.kotlin:kotlin-test")
}

kotlin {
    jvmToolchain(17)
}

application {
    mainClass.set("org.example.JavaSqlServer")
}

tasks.jar {
    manifest {
        attributes["Main-Class"] = "org.example.JavaSqlServer"
    }

    // Include runtime dependencies in the JAR, excluding META-INF signatures
    from(configurations.runtimeClasspath.get().map { it ->
        if (it.isDirectory) it else zipTree(it).matching {
            exclude("META-INF/*.SF", "META-INF/*.RSA", "META-INF/*.DSA")
        }
    })

    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        jvmTarget = "17"
    }
}

tasks.build {
    dependsOn(tasks.jar)
}
